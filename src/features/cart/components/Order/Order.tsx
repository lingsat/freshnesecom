import React, { ChangeEvent, FC, useState } from "react";
import { toast } from "react-toastify";

import { getSubtotalPrice, getTotalPrice } from "@/utils/cart";
import { getDeliveryDay } from "@/utils/date";
import { ICartItem } from "@Cart/types/cart";
import { PROMO_CODE, TAX_VALUE } from "@/constants";
import CartItem from "@CartComponents/CartItem/CartItem";

import "./Order.scss";

interface OrderProps {
  cartProducts: ICartItem[];
}

const Order: FC<OrderProps> = ({ cartProducts }) => {
  const [promoCode, setPromoCode] = useState<string>("");
  const [isPromoAplied, setIsPromoAplied] = useState<boolean>(false);

  const subTotalPrice = getSubtotalPrice(cartProducts);
  const taxTotalPrice = ((+subTotalPrice * TAX_VALUE) / 100).toFixed(2);
  const totalOrderPrice = getTotalPrice(subTotalPrice, isPromoAplied);
  const deliveryDate = getDeliveryDay(cartProducts);

  const notifyInvalidPromo = () => toast('Invalid Promo Code. Try - "promo"');

  const handlePromoCodeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPromoCode(event.target.value);
  };

  const handlePromoCodeSubmit = () => {
    if (promoCode === PROMO_CODE) {
      setIsPromoAplied(true);
    } else {
      notifyInvalidPromo();
    }
    setPromoCode("");
  };

  return (
    <div className="order">
      <h3 className="order__title">Order Summary</h3>
      <p className="order__description">
        Price can change depending on shipping method and taxes of your state.
      </p>
      <ul className="order__list">
        {cartProducts.map((cartItem) => (
          <CartItem key={`cart-${cartItem.product.id}`} cartItem={cartItem} />
        ))}
      </ul>
      <div className="order__subtotal">
        <h4>Subtotal</h4>
        <p>{subTotalPrice} USD</p>
      </div>
      <div className="order__subtotal">
        <h4>Tax</h4>
        <p>
          {TAX_VALUE}% - {taxTotalPrice} USD
        </p>
      </div>
      <form className="order__promo" onSubmit={handlePromoCodeSubmit}>
        <label className="order__code">
          <input
            type="text"
            placeholder="Apply promo code"
            value={promoCode}
            onChange={handlePromoCodeChange}
            disabled={isPromoAplied}
          />
          <button type="submit" className="order__btn" disabled={isPromoAplied}>
            Apply now
          </button>
        </label>
        {isPromoAplied && (
          <p className="order__message">Promo code successfully aplied!</p>
        )}
      </form>
      <div className="order__total">
        <div>
          <h4 className="total__title">Total Order</h4>
          <p className="total__text">
            Guaranteed delivery day: <span>{deliveryDate}</span>
          </p>
        </div>
        <p className="total__price">{totalOrderPrice} USD</p>
      </div>
    </div>
  );
};

export default Order;
