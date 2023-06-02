import React, { ChangeEvent, FC, FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { AppDispatch, RootState } from "@Store/store";
import { fetchCartProducts, ICartState, selectCart } from "@Cart/cartSlice";
import { getDeliveryDay } from "@/utils/date";
import { getCartItemWithProduct, getInvalidCategories } from "@Cart/utils/cart";
import { getSubtotalPrice, getTotalPrice } from "@Cart/utils/price";
import { PROMO_CODE, PROMO_CODE_DISCOUNT, TAX_VALUE } from "@/constants";
import CartItem from "@CartComponents/CartItem/CartItem";
import LoadinSpinner from "@CommonComponents/LoadingSpinner/LoadingSpinner";

import "./Order.scss";

const Order: FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { cart, cartProducts, isCartLoading, cartError } = useSelector<
    RootState,
    ICartState
  >(selectCart);

  const [promoCode, setPromoCode] = useState<string>("");
  const [isPromoAplied, setIsPromoAplied] = useState<boolean>(false);

  const cartItemsWithProducts = getCartItemWithProduct(cart, cartProducts);

  const subTotalPrice = getSubtotalPrice(cartItemsWithProducts);
  const taxTotalPrice = ((+subTotalPrice * TAX_VALUE) / 100).toFixed(2);
  const [totalOrderPrice, promoPriceDiscount] = getTotalPrice(
    subTotalPrice,
    isPromoAplied
  );
  const deliveryDate = getDeliveryDay(cartProducts);

  const notifyInvalidPromo = () =>
    toast.warn('Invalid Promo Code. Try - "promo"');

  const handlePromoCodeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPromoCode(event.target.value);
  };

  const handlePromoCodeSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (promoCode === PROMO_CODE) {
      setIsPromoAplied(true);
    } else {
      notifyInvalidPromo();
    }
    setPromoCode("");
  };

  useEffect(() => {
    if (cart.length) {
      dispatch(fetchCartProducts(cart));
    }
  }, []);

  if (isCartLoading && cart.length !== cartProducts.length) {
    return <LoadinSpinner />;
  }

  if (!cartProducts || cartError) {
    return (
      <p className="order__error">
        Server is busy! Please wait for 10 seconds and then try refreshing the
        page!
      </p>
    );
  }

  return (
    <div className="order">
      <h3 className="order__title">Order Summary</h3>
      <p className="order__description">
        Price can change depending on shipping method and taxes of your state.
      </p>
      <ul className="order__list">
        {cartItemsWithProducts.map((itemWithProduct, index) => (
          <CartItem
            key={`cart-${itemWithProduct.product.id}-${index}`}
            itemWithProduct={itemWithProduct}
            invalidCategories={getInvalidCategories(cart, itemWithProduct)}
          />
        ))}
      </ul>
      <div className="order__row">
        <h4>Subtotal</h4>
        <p>{subTotalPrice} USD</p>
      </div>
      <div className="order__row">
        <h4>Tax</h4>
        <p>
          +{TAX_VALUE}% + {taxTotalPrice} USD
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
        {isPromoAplied && (
          <div className="order__row order__row--promo">
            <h4>Promo</h4>
            <p>
              -{PROMO_CODE_DISCOUNT}% - {promoPriceDiscount} USD
            </p>
          </div>
        )}
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
