import React, { FC } from "react";
import { Link } from "react-router-dom";
import star from "@/assets/images/star.svg";
import checkedStar from "@/assets/images/star_checked.svg";
import arrowRightIcon from "@/assets/images/arrow_right.svg";
import heartIcon from "@/assets/images/heart.svg";
import "./ProductCard.scss";

const ProductCard: FC = () => {
  return (
    <li className="card">
      <Link to="/products/1">
        <img
          className="card__image"
          src="https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F43%2F2022%2F11%2F07%2F11691-tomato-and-garlic-pasta-ddmfs-3x4-1.jpg&q=60&c=sc&orient=true&poi=auto&h=512"
          alt="CardImage"
        />
      </Link>
      <div className="card__info">
        <div className="info__left">
          <h3 className="info__title">
            <Link to="/products/1">Garlic Pasta</Link>
          </h3>
          <p className="info__description">A simple garlic and tomato pasta</p>
          <ul className="info__stars">
            <li>
              <img src={checkedStar} alt="Star" />
            </li>
            <li>
              <img src={checkedStar} alt="Star" />
            </li>
            <li>
              <img src={checkedStar} alt="Star" />
            </li>
            <li>
              <img src={checkedStar} alt="Star" />
            </li>
            <li>
              <img src={star} alt="Star" />
            </li>
          </ul>
          <ul className="subinfo">
            <li className="subinfo__row">
              <p className="subinfo__category">Fresheness</p>
              <p className="subinfo__value">
                <span>New</span> (Extra fresh)
              </p>
            </li>
            <li className="subinfo__row">
              <p className="subinfo__category">Farm</p>
              <p className="subinfo__value">Grocery Tarm Fields</p>
            </li>
            <li className="subinfo__row">
              <p className="subinfo__category">Delivery</p>
              <p className="subinfo__value">Europe</p>
            </li>
            <li className="subinfo__row">
              <p className="subinfo__category">Fresheness</p>
              <p className="subinfo__value">
                <span>320 pcs</span>
              </p>
            </li>
          </ul>
        </div>
        <div className="info__right">
          <p className="info__price">36.99 USD</p>
          <p className="info__old-price">48.56</p>
          <p className="info__shipping">Free Shipping</p>
          <p className="info__delivery">Delivery in 1 day</p>
          <Link to="/products/1" className="info__btn">
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
