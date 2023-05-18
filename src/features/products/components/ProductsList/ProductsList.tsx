import React, { FC } from "react";
import ProductCard from "@products/components/ProductCard/ProductCard";
import { IProduct } from "@products/types/product";
import "./ProductsList.scss";

interface ProductsListProps {
  products: IProduct[];
}

const ProductsList: FC<ProductsListProps> = ({ products }) => {
  if (!products.length) {
    return <p className="not-found">No items found!</p>;
  }

  return (
    <ul className="list">
      {products.map((product) => (
        <ProductCard key={`product-${product.id}`} product={product} />
      ))}
    </ul>
  );
};

export default ProductsList;
