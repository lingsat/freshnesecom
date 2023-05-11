import React, { FC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import ListNavigation from "@products/components/ListNavigation/ListNavigation";
import ListFilter from "@products/components/ListFilter/ListFilter";
import ProductsList from "@products/components/ProductsList/ProductsList";
import { IProduct } from "@products/types/product.interface";
import "./ProductsListPage.scss";

const ProductsListPage: FC = () => {
  const products = useSelector<RootState, IProduct[]>(
    (state) => state.products.products
  );

  return (
    <div className="products-list">
      <ListNavigation />
      <div className="products-list__header">
        <h2 className="products-list__title">All Products</h2>
        <div className="products-list__stat">
          <p>{products.length}</p>
          <span>Products</span>
        </div>
      </div>
      <div className="products-list__main">
        <ListFilter />
        <ProductsList />
      </div>
    </div>
  );
};

export default ProductsListPage;
