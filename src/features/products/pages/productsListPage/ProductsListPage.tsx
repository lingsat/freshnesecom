import React, { FC, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { IProductsState } from "@products/productsSlice";
import { getFilteredProducts } from "@/utils/products.utils";
import { getPaginatedProducts } from "@/utils/pagination";
import ListNavigation from "@products/components/ListNavigation/ListNavigation";
import ListFilter from "@products/components/ListFilter/ListFilter";
import ListSort from "@products/components/ListSort/ListSort";
import ProductsList from "@products/components/ProductsList/ProductsList";
import ListPagination from "@products/components/ListPagination/ListPagination";
import LoadinSpinner from "@/common/components/LoadingSpinner/LoadingSpinner";
import "./ProductsListPage.scss";

const ProductsListPage: FC = () => {
  const { products, loading, filter, sortRule, pagination } = useSelector<
    RootState,
    IProductsState
  >((state) => state.products);
  const listRef = useRef<HTMLDivElement>(null);

  const filteredProducts = getFilteredProducts(products, filter, sortRule);
  const paginatedProducts = getPaginatedProducts(filteredProducts, pagination);

  const handlePageScroll = () => {
    if (listRef) {
      listRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="products-list" ref={listRef}>
      <ListNavigation />
      <div className="products-list__header">
        <h2 className="products-list__title">
          {filter.category || "All Products"}
        </h2>
        <div className="products-list__stat">
          <p>{paginatedProducts.length}</p>
          <span>Products/page</span>
        </div>
      </div>
      <ListSort sortRule={sortRule} />
      {loading ? (
        <LoadinSpinner />
      ) : (
        <div className="products-list__main">
          <ListFilter />
          <ProductsList products={paginatedProducts} />
          <ListPagination
            productsCount={filteredProducts.length}
            pagination={pagination}
            handlePageScroll={handlePageScroll}
          />
        </div>
      )}
    </div>
  );
};

export default ProductsListPage;
