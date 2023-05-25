import React, { FC, useState } from "react";

import {
  getOldPrice,
  getProductDataList,
  getStarsArrFromNumber,
} from "@/utils/products";
import { ECount, IProduct } from "@Products/types/product";
import Button, {
  EBtnImage,
  EBtnImagePos,
  EBtnStyle,
} from "@CommonComponents/Button/Button";
import Count from "@ProductsComponents/Count/Count";
import Tabs from "@ProductsComponents/Tabs/Tabs";

import star from "@Images/star.svg";
import checkedStar from "@Images/star_checked.svg";

import "./ProductInfo.scss";

interface ProductInfoProps {
  product: IProduct;
}

const ProductInfo: FC<ProductInfoProps> = ({ product }) => {
  const [countCategory, setCountCategory] = useState<string>(
    product.mainCountCategory
  );
  const [count, setCount] = useState<number>(1);

  const isCountInvalid =
    count > product.stock[countCategory] || count < ECount.MIN_COUNT_VALUE;
  const starsArr = getStarsArrFromNumber(product.stars);
  const currentPrice = (product.price[countCategory] * +count).toFixed(2);
  const oldPrice = getOldPrice(+currentPrice, product.discount);
  const datalist = getProductDataList(product, countCategory);

  return (
    <div className="product-info">
      <h2 className="product-info__title">{product.title}</h2>
      <div className="product-info__stat">
        <ul className="product-info__stars">
          {starsArr.map((item, index) => (
            <li key={`productStar-${item}-${index}`}>
              <img src={item ? checkedStar : star} alt="Star" />
            </li>
          ))}
        </ul>
        <p>({product.votes} customers review)</p>
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
        />
        <Button
          image={EBtnImage.PLUS}
          imagePosition={EBtnImagePos.LEFT}
          text="Add to cart"
          disabled={isCountInvalid}
        />
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
