import React, { FC, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { IProductsState } from "@products/productsSlice";
import {
  getFilteredProducts,
  getPaginatedProducts,
} from "@/utils/products.utils";
import ListNavigation from "@products/components/ListNavigation/ListNavigation";
import ListFilter from "@products/components/ListFilter/ListFilter";
import ListSort from "@products/components/ListSort/ListSort";
import ProductsList from "@products/components/ProductsList/ProductsList";
import ListPagination from "@products/components/ListPagination/ListPagination";
import LoadinSpinner from "@/common/components/LoadingSpinner/LoadingSpinner";
import { EPagination } from "@products/types/pagination.enum";
import "./ProductsListPage.scss";

const ProductsListPage: FC = () => {
  const { products, loading, filter, sortRule } = useSelector<
    RootState,
    IProductsState
  >((state) => state.products);

  const [currentPage, setCurrentPage] = useState<number>(
    EPagination.INITIAL__PAGE
  );
  const [productsPerPage, setProductsPerPage] = useState<number>(
    EPagination.PRODUCTS_PER_PAGE
  );

  const handlePageChange = ({ selected }: { selected: number }) => {
    setProductsPerPage(EPagination.PRODUCTS_PER_PAGE);
    setCurrentPage(selected);
  };

  const filteredProducts = getFilteredProducts(products, filter, sortRule);
  const paginatedProducts = getPaginatedProducts(
    filteredProducts,
    currentPage,
    productsPerPage
  );

  return (
    <div className="products-list">
      <ListNavigation />
      <div className="products-list__header">
        <h2 className="products-list__title">
          {filter.category || "All Products"}
        </h2>
        <div className="products-list__stat">
          <p>{filteredProducts.length}</p>
          <span>Products</span>
        </div>
      </div>
      <ListSort sortRule={sortRule} />
      {loading ? (
        <LoadinSpinner />
      ) : (
        <div className="products-list__main">
          <ListFilter />
          <ProductsList filteredProducts={paginatedProducts} />
          <ListPagination
            productsCount={filteredProducts.length}
            handlePageChange={handlePageChange}
            setProductsPerPage={setProductsPerPage}
          />
        </div>
      )}
    </div>
  );
};

export default ProductsListPage;
