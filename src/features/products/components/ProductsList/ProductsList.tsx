import React, { FC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { IProductsState } from "@products/productsSlice";
import { getFilteredProducts } from "@/utils/products.utils";
import ProductCard from "@products/components/ProductCard/ProductCard";
import LoadinSpinner from "@/common/components/LoadingSpinner/LoadingSpinner";
import "./ProductsList.scss";

const ProductsList: FC = () => {
  const { products, loading, searchValue, category } = useSelector<
    RootState,
    IProductsState
  >((state) => state.products);

  const filteredProducts = getFilteredProducts(products, category, searchValue);

  if (loading) {
    return <LoadinSpinner />;
  }

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
