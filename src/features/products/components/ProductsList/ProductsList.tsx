import React, { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { fetchProducts } from "@features/products/productsSlice";
import ProductCard from "../ProductCard/ProductCard";
import { IProduct } from "../../types/product.interface";
import "./ProductsList.scss";

const ProductsList: FC = () => {
  const products = useSelector<RootState, IProduct[]>(
    (state) => state.products.products
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  return (
    <ul className="list">
      {products.map((product) => (
        <ProductCard key={`product-${product.id}`} product={product} />
      ))}
    </ul>
  );
};

export default ProductsList;
