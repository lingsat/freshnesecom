import React from "react";
import { useSelector } from "react-redux";

import { RootState } from "@Store/store";
import { ICartState, selectCart } from "@Cart/cartSlice";
import Order from "@CartComponents/Order/Order";
import Billing from "@CartComponents/Billing/Billing";

import "./Cart.scss";

const Cart = () => {
  const { cart } = useSelector<RootState, ICartState>(selectCart);

  if (!cart.length) {
    return (
      <p className="cart__message">Cart is empty! Try to add some products.</p>
    );
  }

  return (
    <div className="cart">
      <Order cartProducts={cart} />
      <Billing />
    </div>
  );
};

export default Cart;
