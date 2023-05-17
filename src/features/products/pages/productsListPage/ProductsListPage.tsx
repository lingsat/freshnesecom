import React, { FC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { IProductsState } from "@products/productsSlice";
import { getFilteredProducts } from "@/utils/products.utils";
import ListNavigation from "@products/components/ListNavigation/ListNavigation";
import ListFilter from "@products/components/ListFilter/ListFilter";
import ListSort from "@products/components/ListSort/ListSort";
import ProductsList from "@products/components/ProductsList/ProductsList";
import LoadinSpinner from "@/common/components/LoadingSpinner/LoadingSpinner";
import "./ProductsListPage.scss";
import ListPagination from "../../components/ListPagination/ListPagination";

const ProductsListPage: FC = () => {
  const { products, loading, filter, sortRule } = useSelector<
    RootState,
    IProductsState
  >((state) => state.products);

  const filteredProducts = getFilteredProducts(products, filter, sortRule);

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
          <ProductsList filteredProducts={filteredProducts} />
          <ListPagination productsCount={filteredProducts.length} />
        </div>
      )}
    </div>
  );
};

export default ProductsListPage;
