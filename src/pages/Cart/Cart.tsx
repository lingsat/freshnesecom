import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { RootState } from "@Store/store";
import { ICartState, selectCart } from "@Cart/cartSlice";
import { ERoutes } from "@/types/routes";
import Button, { EBtnStyle } from "@CommonComponents/Button/Button";
import Order from "@CartComponents/Order/Order";
import Billing from "@CartComponents/Billing/Billing";

import emptyCart from "@Images/empty_cart.webp";

import "./Cart.scss";

const Cart = () => {
  const navigate = useNavigate();
  const { cart } = useSelector<RootState, ICartState>(selectCart);

  const handleNavToProducts = () => {
    navigate(`/${ERoutes.PRODUCTS_LIST}`);
  };

  if (!cart.length) {
    return (
      <div className="cart__empty">
        <p className="cart__message">
          Cart is empty! Try to add some products.
        </p>
        <img className="cart__image" src={emptyCart} alt="Empty Cart" />
        <Button
          text="Back to Shopping"
          style={EBtnStyle.BIG}
          onCLick={handleNavToProducts}
        />
      </div>
    );
  }

  return (
    <div className="cart">
      <Order />
      <Billing />
    </div>
  );
};

export default Cart;
