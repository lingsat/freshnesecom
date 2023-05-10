import React, { FC } from "react";
import ProductCard from "../ProductCard/ProductCard";
import "./ProductsList.scss";

const ProductsList: FC = () => {
  return (
    <ul className="list">
      <ProductCard />
      <ProductCard />
      <ProductCard />
    </ul>
  );
};

export default ProductsList;
