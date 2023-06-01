import React, { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { AppDispatch } from "@Store/store";
import { removeSingleCartItem, setCartItemCount } from "@Cart/cartSlice";
import { ERoutes } from "@/types/routes";
import { ECount, IProduct } from "@Products/types/product";
import { ICartItem } from "@Cart/types/cart";
import Stars from "@CommonComponents/Stars/Stars";
import Count from "@CommonComponents/Count/Count";

import heart from "@Images/heart_thin.svg";
import close from "@Images/close.svg";

import "./CartItem.scss";

interface CartItemProps {
  cartProduct: IProduct;
  cartData: ICartItem;
}

const CartItem: FC<CartItemProps> = ({ cartProduct, cartData }) => {
  const { productId, amount, category } = cartData;

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [countCategory, setCountCategory] = useState<string>(category);
  const [count, setCount] = useState<number>(amount);

  const isCountInvalid =
    count > cartProduct.stock[countCategory] || count < ECount.MIN_COUNT_VALUE;
  const priceSummary = (cartProduct.price[category] * count).toFixed(2);

  const handleRemoveCartItem = () => {
    dispatch(removeSingleCartItem(cartProduct.id));
  };

  const handleOpenProduct = () => {
    navigate(`/${ERoutes.PRODUCTS_LIST}/${cartProduct.id}`);
  };

  useEffect(() => {
    dispatch(
      setCartItemCount({
        productId,
        amount: count,
        category: countCategory,
      })
    );
  }, [count, countCategory]);

  return (
    <li className="cart-item">
      <div className="cart-item__left">
        <img
          src={cartProduct.images[0]}
          alt={cartProduct.title}
          className="cart-item__image"
          onClick={handleOpenProduct}
        />
        <div className="cart-item__buttons">
          <button className="cart-item__btn">
            <img src={heart} alt="Heart" />
            Wishlist
          </button>
          <button className="cart-item__btn" onClick={handleRemoveCartItem}>
            <img src={close} alt="Close" />
            Remove
          </button>
        </div>
      </div>
      <div className="cart-item__right">
        <h3 className="cart-item__title" onClick={handleOpenProduct}>
          {cartProduct.title}
        </h3>
        <ul className="cart-item__list">
          <li className="cart-item__item">
            <p className="cart-item__category">Brand:</p>
            <p className="cart-item__value">{cartProduct.brand}</p>
          </li>
          <li className="cart-item__item">
            <p className="cart-item__category">Freshness:</p>
            <p className="cart-item__value">{cartProduct.freshness}</p>
          </li>
        </ul>
        <Stars checkedStars={cartProduct.stars.toString()} />
        <div className="cart-item__controls">
          <p className="cart-item__price">{priceSummary} USD</p>
          <Count
            product={cartProduct}
            countCategory={countCategory}
            setCountCategory={setCountCategory}
            count={count}
            setCount={setCount}
            isCountInvalid={isCountInvalid}
          />
        </div>
      </div>
    </li>
  );
};

export default CartItem;
