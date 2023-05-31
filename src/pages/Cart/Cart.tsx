import React from "react";
import { useSelector } from "react-redux";

import { RootState } from "@Store/store";
import { ICartState, selectCart } from "@Cart/cartSlice";
import { ICartItemWithProduct } from "@Cart/types/cart";
import Order from "@CartComponents/Order/Order";
import Billing from "@CartComponents/Billing/Billing";

import "./Cart.scss";

const Cart = () => {
  const { cart } = useSelector<RootState, ICartState>(selectCart);

  const cartWithProducts: ICartItemWithProduct[] = [];

  if (!cart.length) {
    return (
      <p className="cart__message">Cart is empty! Try to add some products.</p>
    );
  }

  return (
    <div className="cart">
      <Order cartProducts={cartWithProducts} />
      <Billing />
    </div>
  );
};

export default Cart;
