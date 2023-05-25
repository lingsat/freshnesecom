import React, { FC } from "react";
import { Link, useNavigate } from "react-router-dom";

import { getOldPrice, getStarsArrFromNumber } from "@/utils/products";
import { IProduct } from "@Products/types/product";
import Button, {
  EBtnImage,
  EBtnImagePos,
  EBtnStyle,
} from "@CommonComponents/Button/Button";

import star from "@Images/star.svg";
import checkedStar from "@Images/star_checked.svg";

import "./Card.scss";

interface CardProps {
  product: IProduct;
}

const Card: FC<CardProps> = ({ product }) => {
  const navigate = useNavigate();

  const { mainPrice, mainCountCategory } = product;
  const starsArr = getStarsArrFromNumber(product.stars);
  const oldPrice = getOldPrice(product.mainPrice, product.discount);

  const handleOpenProduct = () => {
    navigate(`/products/${product.id}`);
  };

  return (
    <li className="card">
      <Link to={`/products/${product.id}`}>
        <img
          className="card__image"
          src={product.images[0]}
          alt={product.title}
        />
      </Link>
      <div className="card__info">
        <div className="info__left">
          <h3 className="info__title">
            <Link to={`/products/${product.id}`}>{product.title}</Link>
          </h3>
          <p className="info__description">{product.shortDescription}</p>
          <ul className="info__stars">
            {starsArr.map((item, index) => (
              <li key={`star-${product.id}-${index}`}>
                <img src={item ? checkedStar : star} alt="Star" />
              </li>
            ))}
          </ul>
          <ul className="subinfo">
            {product.category === "Food" && (
              <li className="subinfo__row">
                <p className="subinfo__category">Fresheness</p>
                <p className="subinfo__value">
                  <span>{product.freshness}</span>
                  {product.freshness === "New" && " (Extra fresh)"}
                </p>
              </li>
            )}
            <li className="subinfo__row">
              <p className="subinfo__category">Brand</p>
              <p className="subinfo__value">{product.brand}</p>
            </li>
            <li className="subinfo__row">
              <p className="subinfo__category">Delivery</p>
              <p className="subinfo__value">{product.countryFrom}</p>
            </li>
            <li className="subinfo__row">
              <p className="subinfo__category">Stock</p>
              <p className="subinfo__value">
                <span>
                  {`${product.stock[mainCountCategory]} ${mainCountCategory}`}{" "}
                </span>
              </p>
            </li>
          </ul>
        </div>
        <div className="info__right">
          <div className="info__price-block">
            <p className="info__price">{mainPrice} USD</p>
            <p className="info__old-price">{oldPrice}</p>
          </div>
          <div className="info__delivery-block">
            <p className="info__shipping">
              {product.freeShipping ? "Free" : "Payed"} Shipping
            </p>
            <p className="info__delivery">
              Delivery in {product.deliveryTime} day
            </p>
          </div>
          <div className="info__buttons">
            <Button text="Product Detail" onCLick={handleOpenProduct} />
            <Button
              style={EBtnStyle.SECONDARY}
              image={EBtnImage.HEART}
              imagePosition={EBtnImagePos.LEFT}
              text="Add to wish list"
            />
          </div>
        </div>
      </div>
    </li>
  );
};

export default Card;
