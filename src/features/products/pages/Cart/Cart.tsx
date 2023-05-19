import React, { FC } from "react";
import { Link } from "react-router-dom";

const Cart: FC = () => {
  return (
    <div>
      <h2>Cart</h2>
      <Link to="/products">Back to product list</Link>
    </div>
  );
};

export default Cart;
