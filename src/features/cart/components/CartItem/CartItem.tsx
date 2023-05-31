import React, { FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { AppDispatch } from "@Store/store";
import { removeSingleCartItem, setCartItemCount } from "@Cart/cartSlice";
import { ECount } from "@Products/types/product";
import { ICartItem } from "@Cart/types/cart";
import Stars from "@CommonComponents/Stars/Stars";
import Count from "@CommonComponents/Count/Count";

import heart from "@Images/heart_thin.svg";
import close from "@Images/close.svg";

import "./CartItem.scss";

interface CartItemProps {
  cartItem: ICartItem;
}

const CartItem: FC<CartItemProps> = ({ cartItem }) => {
  const { product, amount, category } = cartItem;

  const dispatch = useDispatch<AppDispatch>();
  const [countCategory, setCountCategory] = useState<string>(category);
  const [count, setCount] = useState<number>(amount);

  const isCountInvalid =
    count > product.stock[countCategory] || count < ECount.MIN_COUNT_VALUE;
  const priceSummary = (product.price[category] * count).toFixed(2);

  const handleRemoveCartItem = () => {
    dispatch(removeSingleCartItem(product.id));
  };

  useEffect(() => {
    dispatch(
      setCartItemCount({
        prodId: product.id,
        amount: count,
        category: countCategory,
      })
    );
  }, [count, countCategory]);

  return (
    <li className="cart-item">
      <div className="cart-item__left">
        <img
          src={product.images[0]}
          alt={product.title}
          className="cart-item__image"
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
        <h3 className="cart-item__title">{product.title}</h3>
        <ul className="cart-item__list">
          <li className="cart-item__item">
            <p className="cart-item__category">Brand:</p>
            <p className="cart-item__value">{product.brand}</p>
          </li>
          <li className="cart-item__item">
            <p className="cart-item__category">Freshness:</p>
            <p className="cart-item__value">{product.freshness}</p>
          </li>
        </ul>
        <Stars checkedStars={product.stars.toString()} />
        <div className="cart-item__controls">
          <p className="cart-item__price">{priceSummary} USD</p>
          <Count
            product={product}
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
