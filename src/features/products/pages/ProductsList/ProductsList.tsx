import React, { FC, useRef, useState } from "react";
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

import arrowDownThin from "@Images/arrow_down_thin.svg";
import "./ProductsList.scss";

const ProductsList: FC = () => {
  const { products, loading, filter, sortRule, pagination } = useSelector<
    RootState,
    IProductsState
  >((state) => state.products);
  const listRef = useRef<HTMLDivElement>(null);

  const [showFilter, setShowFIlter] = useState<boolean>(false);

  const toggleFilter = () => {
    setShowFIlter((prev) => !prev);
  };

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
      <div className="products-list__controls">
        <Sort sortRule={sortRule} />
        <button className="filter__switcher" onClick={toggleFilter}>
          Filter
          <img
            className={`${showFilter && "reverse__icon"}`}
            src={arrowDownThin}
            alt="DownArrow"
          />
        </button>
      </div>
      {loading ? (
        <div className="spinner__wrapper">
          <LoadinSpinner />
        </div>
      ) : (
        <div className="products-list__main">
          <Filter showFilter={showFilter} toggleFilter={toggleFilter} />
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
