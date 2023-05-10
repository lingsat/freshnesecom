import React, { FC } from "react";
import ListNavigation from "@features/products/components/ListNavigation/ListNavigation";
import ListSort from "@features/products/components/ListSort/ListSort";
import ListFilter from "@features/products/components/ListFilter/ListFilter";
import ProductsList from "@features/products/components/ProductsList/ProductsList";
import "./ProductsListPage.scss";

const ProductsListPage: FC = () => {
  return (
    <div className="products-list">
      <ListNavigation />
      <div className="products-list__header">
        <h2 className="products-list__title">All Products</h2>
        <div className="products-list__stat">
          <p>117</p>
          <span>Products</span>
        </div>
      </div>
      <ListSort />
      <div className="products-list__main">
        <ListFilter />
        <ProductsList />
      </div>
    </div>
  );
};

export default ProductsListPage;
