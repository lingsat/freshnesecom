import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import { AppDispatch, RootState } from "@Store/store";
import {
  fetchSingleProduct,
  IProductsState,
  selectProducts,
} from "@Products/productsSlice";
import { getProductsByCategory } from "@/utils/products";
import LoadinSpinner from "@CommonComponents/LoadingSpinner/LoadingSpinner";
import Suggested from "@CommonComponents/Suggested/Suggested";
import Images from "@ProductsComponents/Images/Images";
import ProductInfo from "@ProductsComponents/ProductInfo/ProductInfo";

import "swiper/scss";
import "./ProductItem.scss";

const ProductItem = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams();
  const { products, singleProduct, isSingleLoading, singleError } = useSelector<
    RootState,
    IProductsState
  >(selectProducts);

  const categoryProducts = getProductsByCategory(products, singleProduct);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (id) {
      dispatch(fetchSingleProduct(id));
    }
  }, [id]);

  if (isSingleLoading) {
    return <LoadinSpinner />;
  }

  if (!singleProduct || singleError) {
    return <p className="product__error">Product not Found!</p>;
  }

  return (
    <div className="product">
      <div className="product__main">
        <Images
          images={singleProduct.images}
          discount={singleProduct.discount}
          freeShipping={singleProduct.freeShipping}
        />
        <ProductInfo product={singleProduct} />
      </div>
      <h3 className="product__subtitle">You will maybe love</h3>
      <div className="product__carousel">
        <div className="swiper__prev"></div>
        <Swiper
          modules={[Navigation]}
          navigation={{
            nextEl: ".swiper__next",
            prevEl: ".swiper__prev",
          }}
          spaceBetween={32}
          slidesPerView={1}
          breakpoints={{
            576: { slidesPerView: 2 },
            850: { slidesPerView: 3 },
            1150: { slidesPerView: 4 },
          }}>
          {categoryProducts.map((product) => (
            <SwiperSlide key={`suggested-${product.id}`}>
              <Suggested product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="swiper__next"></div>
      </div>
    </div>
  );
};

export default ProductItem;
