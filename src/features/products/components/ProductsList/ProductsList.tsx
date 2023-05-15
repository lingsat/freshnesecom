import React, { FC } from "react";
import ProductCard from "@products/components/ProductCard/ProductCard";
import { IProduct } from "@products/types/product.interface";
import "./ProductsList.scss";

interface ProductsListProps {
  filteredProducts: IProduct[];
}

const ProductsList: FC<ProductsListProps> = ({ filteredProducts }) => {
  if (!filteredProducts.length) {
    return <p className="not-found">No items found!</p>;
  }

  return (
    <ul className="list">
      {filteredProducts.map((product) => (
        <ProductCard key={`product-${product.id}`} product={product} />
      ))}
    </ul>
  );
};

export default ProductsList;
