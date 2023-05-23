import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

import { AppDispatch, RootState } from "@Store/store";
import {
  fetchSingleProduct,
  IProductsState,
  selectProducts,
} from "@Products/productsSlice";
import LoadinSpinner from "@CommonComponents/LoadingSpinner/LoadingSpinner";

const ProductItem = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams();
  const { singleProduct, isSingleLoading } = useSelector<
    RootState,
    IProductsState
  >(selectProducts);

  useEffect(() => {
    if (id) {
      dispatch(fetchSingleProduct(id));
    }
  }, []);

  if (isSingleLoading) {
    return <LoadinSpinner />;
  }

  if (!singleProduct) {
    return <p>Product Not Found!</p>;
  }

  return (
    <div>
      <h2>Product {singleProduct.title}</h2>
      <Link to="/products">Back to product list</Link>
    </div>
  );
};

export default ProductItem;
