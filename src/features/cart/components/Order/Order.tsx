import React, { FC } from "react";

import { ICartItemWithProduct } from "@Cart/types/cart";
import CartItem from "@CartComponents/CartItem/CartItem";

import "./Order.scss";

interface OrderProps {
  cartProducts: ICartItemWithProduct[];
}

const Order: FC<OrderProps> = ({ cartProducts }) => {
  return (
    <div className="order">
      <h3 className="order__title">Order Summary</h3>
      <p className="order__description">
        Price can change depending on shipping method and taxes of your state.
      </p>
      <ul className="order__list">
        {cartProducts.map((cartItem) => (
          <CartItem key={`cart-${cartItem.productId}`} cartItem={cartItem} />
        ))}
      </ul>
      <div className="order__subtotal">
        <h4>Subtotal</h4>
        <p>73.98 USD</p>
      </div>
      <div className="order__subtotal">
        <h4>Tax</h4>
        <p>17% - 16.53 USD</p>
      </div>
      <form className="order__promo">
        <label className="order__code">
          <input type="text" placeholder="Apply promo code" />
        </label>
        <button className="order__btn">Apply now</button>
      </form>
      <div className="order__total">
        <div>
          <h4 className="total__title">Total Order</h4>
          <p className="total__text">
            Guaranteed delivery day: <span>June 12, 2020</span>
          </p>
        </div>
        <p className="total__price">89.84 USD</p>
      </div>
    </div>
  );
};

export default Order;
