import React from "react";

import { getStarsArrFromNumber } from "@/utils/products";
import Button from "@CommonComponents/Button/Button";
import Count from "@ProductsComponents/Count/Count";

import star from "@Images/star.svg";
import checkedStar from "@Images/star_checked.svg";

import "./ProductInfo.scss";

const ProductInfo = () => {
  const starsArr = getStarsArrFromNumber(4);

  return (
    <div className="product-info">
      <h2 className="product-info__title">Acer Aspire 5 A515-56-347N Slim</h2>
      <div className="product-info__stat">
        <ul className="product-info__stars">
          {starsArr.map((item, index) => (
            <li key={`productStar-${item}-${index}`}>
              <img src={item ? checkedStar : star} alt="Star" />
            </li>
          ))}
        </ul>
        <p>(1 customer review)</p>
      </div>
      <p className="product-info__description">
        Carrots from Tomissy Farm are one of the best on the market. Tomisso and
        his family are giving a full love to his Bio products. To misso’s
        carrots are growing on the fields naturally.
      </p>
      <ul className="product-info__datalist">
        <li>
          <p className="datalist__category">Country:</p>
          <p className="datalist__value">76645</p>
        </li>
        <li>
          <p className="datalist__category">Size:</p>
          <p className="datalist__value">all sizes</p>
        </li>
        <li>
          <p className="datalist__category">Category:</p>
          <p className="datalist__value">Vegetables</p>
        </li>
        <li>
          <p className="datalist__category">Buy by:</p>
          <p className="datalist__value">pcs, kgs, box, pack</p>
        </li>
        <li>
          <p className="datalist__category">Stock:</p>
          <p className="datalist__value">In Stock</p>
        </li>
        <li>
          <p className="datalist__category">Delivery:</p>
          <p className="datalist__value">in 2 days</p>
        </li>
        <li>
          <p className="datalist__category">Color:</p>
          <p className="datalist__value">White blue </p>
        </li>
        <li>
          <p className="datalist__category">Delivery area:</p>
          <p className="datalist__value">Czech republic</p>
        </li>
      </ul>
      <div className="product-info__order">
        <div className="product-info__price">
          <p className="price__main">36.23 USD</p>
          <p className="price__old">48.56 USD</p>
        </div>
        <Count />
        <Button image="plus" imagePosition="left" text="Add to cart" />
      </div>
      <Button
        style="secondary"
        image="heart"
        imagePosition="left"
        text="Add to my wish list"
      />
    </div>
  );
};

export default ProductInfo;
