import React, { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { AppDispatch, RootState } from "@Store/store";
import { addToCart, ICartState, selectCart } from "@Cart/cartSlice";
import { getOldPrice, getProductDataList } from "@/utils/products";
import { ECount, IProduct } from "@Products/types/product";
import { ERoutes } from "@/types/routes";
import { ICartItem } from "@Cart/types/cart";
import Button, {
  EBtnImage,
  EBtnImagePos,
  EBtnStyle,
} from "@CommonComponents/Button/Button";
import Stars, { EStarsColor } from "@CommonComponents/Stars/Stars";
import Count from "@CommonComponents/Count/Count";
import Tabs from "@ProductsComponents/Tabs/Tabs";

import "./ProductInfo.scss";

interface ProductInfoProps {
  product: IProduct;
}

const ProductInfo: FC<ProductInfoProps> = ({ product }) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { cart } = useSelector<RootState, ICartState>(selectCart);

  const [countCategory, setCountCategory] = useState<string>(
    product.mainCountCategory
  );
  const [count, setCount] = useState<number>(1);

  const isCountInvalid =
    count > product.stock[countCategory] || count < ECount.MIN_COUNT_VALUE;
  const currentPrice = (product.price[countCategory] * +count).toFixed(2);
  const oldPrice = getOldPrice(+currentPrice, product.discount);
  const datalist = getProductDataList(product, countCategory);

  const isProductInCart = cart.find((item) => item.product.id === product.id);

  const handleAddToCart = () => {
    const newCartItem: ICartItem = {
      product,
      amount: count,
      category: countCategory,
    };

    dispatch(addToCart(newCartItem));
  };

  const handleOpenCart = () => {
    navigate(`/${ERoutes.CART}`);
  };

  return (
    <div className="product-info">
      <h2 className="product-info__title">{product.title}</h2>
      <div className="product-info__stat">
        <Stars
          checkedStars={product.stars.toString()}
          starColor={EStarsColor.BLACK}
        />
        <p>({product.reviews.length} customers review)</p>
      </div>
      <p className="product-info__description">{product.shortDescription}</p>
      <ul className="product-info__datalist">
        {datalist.map((item, index) => (
          <li key={`datalist-${item.category}-${index}`}>
            <p className="datalist__category">{item.category}</p>
            <p className="datalist__value">{item.value}</p>
          </li>
        ))}
      </ul>
      <div className="product-info__order">
        <div className="product-info__price">
          <p className="price__main">{currentPrice} USD</p>
          <p className="price__old">{oldPrice} USD</p>
        </div>
        <Count
          product={product}
          countCategory={countCategory}
          setCountCategory={setCountCategory}
          count={count}
          setCount={setCount}
          isCountInvalid={isCountInvalid}
          disabled={!!isProductInCart}
        />
        {isProductInCart ? (
          <Button
            style={EBtnStyle.SECONDARY}
            image={EBtnImage.BASKET}
            imagePosition={EBtnImagePos.LEFT}
            text="In Cart"
            onCLick={handleOpenCart}
          />
        ) : (
          <Button
            image={EBtnImage.PLUS}
            imagePosition={EBtnImagePos.LEFT}
            text="Add to cart"
            disabled={isCountInvalid}
            onCLick={handleAddToCart}
          />
        )}
      </div>
      <Button
        style={EBtnStyle.SECONDARY}
        image={EBtnImage.HEART}
        imagePosition={EBtnImagePos.LEFT}
        text="Add to my wish list"
      />
      <Tabs product={product} />
    </div>
  );
};

export default ProductInfo;
