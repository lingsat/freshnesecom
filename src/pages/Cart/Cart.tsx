import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { RootState } from "@Store/store";
import { ICartState, selectCart } from "@Cart/cartSlice";
import { ERoutes } from "@/types/routes";
import Button, { EBtnStyle } from "@CommonComponents/Button/Button";
import Order from "@CartComponents/Order/Order";
import Billing from "@CartComponents/Billing/Billing";

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
        <Button
          text="Back to Products"
          style={EBtnStyle.BIG}
          onCLick={handleNavToProducts}
        />
      </div>
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
