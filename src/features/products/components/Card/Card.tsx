import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { AppDispatch, RootState } from "@Store/store";
import {
  IWishlistState,
  selectWishlist,
  toggleWishlistItem,
} from "@Features/wishlist/wishlistSlice";
import { IAuthState, selectAuth, showAuth } from "@Features/auth/authSlice";
import { getOldPrice } from "@Products/utils/products";
import { IProduct } from "@Products/types/product";
import { EStarsColor } from "@/common/types/stars";
import { EBtnStyle, EBtnImage, EBtnImagePos } from "@/common/types/button";
import Button from "@CommonComponents/Button/Button";
import Stars from "@CommonComponents/Stars/Stars";

import "./Card.scss";

interface CardProps {
  product: IProduct;
}

const Card: FC<CardProps> = ({ product }) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { wishlist } = useSelector<RootState, IWishlistState>(selectWishlist);
  const { user } = useSelector<RootState, IAuthState>(selectAuth);

  const { mainPrice, mainCountCategory } = product;
  const oldPrice = getOldPrice(product.mainPrice, product.discount);
  const isInWishlist = wishlist.includes(product.id);

  const notifyNotLoggedIn = () =>
    toast.warn("The Wishlist is available only to authorized users");

  const handleOpenProduct = () => {
    navigate(product.id);
  };

  const handleToggleWishlist = () => {
    if (!user) {
      notifyNotLoggedIn();
      dispatch(showAuth());
    } else {
      dispatch(toggleWishlistItem(product.id));
    }
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
              text={`${isInWishlist ? "Unwish product" : "Add to wish list"}`}
              style={EBtnStyle.SECONDARY}
              image={isInWishlist ? EBtnImage.HEART_FILLED : EBtnImage.HEART}
              imagePosition={EBtnImagePos.LEFT}
              onCLick={handleToggleWishlist}
            />
          </div>
        </div>
      </div>
    </li>
  );
};

export default Card;
