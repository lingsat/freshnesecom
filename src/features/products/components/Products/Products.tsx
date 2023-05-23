import React, { FC } from "react";

import { IProduct } from "@Products/types/product";
import Card from "@ProductsComponents/Card/Card";

import "./Products.scss";

interface ProductsProps {
  products: IProduct[];
}

const Products: FC<ProductsProps> = ({ products }) => {
  if (!products.length) {
    return <p className="not-found">No items found!</p>;
  }

  return (
    <ul className="list">
      {products.map((product) => (
        <Card key={`product-${product.id}`} product={product} />
      ))}
    </ul>
  );
};

export default Products;
