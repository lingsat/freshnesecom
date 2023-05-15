import React, { FC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { IProductsState } from "@products/productsSlice";
import ProductCard from "@products/components/ProductCard/ProductCard";
import { IProduct } from "@products/types/product.interface";
import "./ProductsList.scss";

interface ProductsListProps {
  filteredProducts: IProduct[];
}

const ProductsList: FC<ProductsListProps> = ({ filteredProducts }) => {
  const { searchValue, category } = useSelector<RootState, IProductsState>(
    (state) => state.products
  );

  if (!filteredProducts.length) {
    return (
      <p className="not-found">
        {`No "${searchValue.trim()}" found in ${category || "All categories"}!`}
      </p>
    );
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
