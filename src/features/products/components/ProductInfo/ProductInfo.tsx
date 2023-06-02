import React, { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { AppDispatch, RootState } from "@Store/store";
import { addToCart, ICartState, selectCart } from "@Cart/cartSlice";
import { getProductMaxCount } from "@/utils/products";
import { getOldPrice } from "@Products/utils/products";
import { getProductDataList } from "@Products/utils/products";
import { ECount, IProduct } from "@Products/types/product";
import { ICartData } from "@Cart/types/cart";
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

  const maxCount = getProductMaxCount(product, cart, countCategory);

  const notifyAddToCart = () =>
    toast.success(`${count} "${countCategory}" added to Cart!`);

  const handleAddToCart = () => {
    const newCartItem: ICartData = {
      productId: product.id,
      count: {
        amount: count,
        category: countCategory,
      },
    };

    dispatch(addToCart(newCartItem));
    setCount(1);
    notifyAddToCart();
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
          maxCount={maxCount}
          disabled={!maxCount}
        />
        <Button
          image={EBtnImage.PLUS}
          imagePosition={EBtnImagePos.LEFT}
          text="Add to cart"
          disabled={isCountInvalid || !maxCount}
          onCLick={handleAddToCart}
        />
        {!maxCount && (
          <p className="product-info__message">{`All ${product.stock[countCategory]} "${countCategory}" already in Cart!"`}</p>
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
