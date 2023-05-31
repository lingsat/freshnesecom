import React, { FC } from "react";
import { useNavigate } from "react-router-dom";

import { getOldPrice } from "@/utils/products";
import { IProduct } from "@Products/types/product";
import Button, {
  EBtnImage,
  EBtnImagePos,
  EBtnStyle,
} from "@CommonComponents/Button/Button";
import Stars, { EStarsColor } from "@CommonComponents/Stars/Stars";

import "./Card.scss";

interface CardProps {
  product: IProduct;
}

const Card: FC<CardProps> = ({ product }) => {
  const navigate = useNavigate();

  const { mainPrice, mainCountCategory } = product;
  const oldPrice = getOldPrice(product.mainPrice, product.discount);

  const handleOpenProduct = () => {
    navigate(product.id);
  };

  return (
    <li className="card">
      <img
        className="card__image"
        src={product.images[0]}
        alt={product.title}
        onClick={handleOpenProduct}
      />
      <div className="card__info">
        <div className="info__left">
          <h3 className="info__title" onClick={handleOpenProduct}>
            {product.title}
          </h3>
          <p className="info__description">{product.shortDescription}</p>
          <Stars
            checkedStars={product.stars.toString()}
            starColor={EStarsColor.BLACK}
          />
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
