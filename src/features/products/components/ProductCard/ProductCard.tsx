import React, { FC } from "react";
import { Link } from "react-router-dom";
import { getStarsArrFromNumber } from "@/utils/starsTransformer";
import star from "@/assets/images/star.svg";
import checkedStar from "@/assets/images/star_checked.svg";
import arrowRightIcon from "@/assets/images/arrow_right.svg";
import heartIcon from "@/assets/images/heart.svg";
import { IProduct } from "@features/products/types/product.interface";
import "./ProductCard.scss";

interface ProductCardProps {
  product: IProduct;
}

const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const starsArr = getStarsArrFromNumber(product.stars);

  return (
    <li className="card">
      <Link to={`/products/${product.id}`}>
        <img className="card__image" src={product.image} alt={product.title} />
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
              <p className="subinfo__category">Company</p>
              <p className="subinfo__value">{product.farm}</p>
            </li>
            <li className="subinfo__row">
              <p className="subinfo__category">Delivery</p>
              <p className="subinfo__value">{product.deliveryFrom}</p>
            </li>
            <li className="subinfo__row">
              <p className="subinfo__category">Stock</p>
              <p className="subinfo__value">
                <span>{product.stock} pcs</span>
              </p>
            </li>
          </ul>
        </div>
        <div className="info__right">
          <p className="info__price">{product.price} USD</p>
          <p className="info__old-price">{product.oldPrice}</p>
          <p className="info__shipping">
            {product.freeShipping ? "Free" : "Payed"} Shipping
          </p>
          <p className="info__delivery">
            Delivery in {product.deliveryTime} day
          </p>
          <Link to={`/products/${product.id}`} className="info__btn">
            Product Detail
            <img src={arrowRightIcon} alt=">" />
          </Link>
          <button className="info__wish-btn">
            <img src={heartIcon} alt="Heart" />
            Add to wish list
          </button>
        </div>
      </div>
    </li>
  );
};

export default ProductCard;
