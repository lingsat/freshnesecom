import React, { FC, useRef } from "react";
import { useSelector } from "react-redux";

import { RootState } from "@Store/store";
import { IProductsState } from "@Products/productsSlice";
import { getFilteredProducts } from "@/utils/products";
import { getPaginatedProducts } from "@/utils/pagination";
import LoadinSpinner from "@CommonComponents/LoadingSpinner/LoadingSpinner";
import Navigation from "@ProductsComponents/Navigation/Navigation";
import Sort from "@ProductsComponents/Sort/Sort";
import Filter from "@ProductsComponents/Filter/Filter";
import Products from "@ProductsComponents/Products/Products";
import Paging from "@ProductsComponents/Paging/Paging";

import "./ProductsList.scss";

const ProductsList: FC = () => {
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
      <Navigation />
      <div className="products-list__header">
        <h2 className="products-list__title">
          {filter.category || "All Products"}
        </h2>
        <div className="products-list__stat">
          <p>{paginatedProducts.length}</p>
          <span>Products/page</span>
        </div>
      </div>
      <Sort sortRule={sortRule} />
      {loading ? (
        <LoadinSpinner />
      ) : (
        <div className="products-list__main">
          <Filter />
          <Products products={paginatedProducts} />
          <Paging
            productsCount={filteredProducts.length}
            pagination={pagination}
            handlePageScroll={handlePageScroll}
          />
        </div>
      )}
    </div>
  );
};

export default ProductsList;
