import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { AppDispatch, RootState } from "@Store/store";
import {
  fetchSingleProduct,
  IProductsState,
  selectProducts,
} from "@Products/productsSlice";
import LoadinSpinner from "@CommonComponents/LoadingSpinner/LoadingSpinner";
import Images from "@ProductsComponents/Images/Images";
import ProductInfo from "@ProductsComponents/ProductInfo/ProductInfo";

import "./ProductItem.scss";

const ProductItem = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams();
  const { singleProduct, isSingleLoading, singleError } = useSelector<
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

  if (!singleProduct || singleError) {
    return <p className="product__error">Product not Found!</p>;
  }

  return (
    <div className="product">
      <Images
        images={singleProduct.images}
        discount={singleProduct.discount}
        freeShipping={singleProduct.freeShipping}
      />
      <ProductInfo product={singleProduct} />
    </div>
  );
};

export default ProductItem;
