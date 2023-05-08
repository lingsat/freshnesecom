import React, { FC } from "react";
import { Link } from "react-router-dom";

const ProductsListPage: FC = () => {
  return (
    <>
      <ul>
        Product List
        <li>
          <Link to="/product/1">Product 1</Link>
        </li>
        <li>
          <Link to="/product/2">Product 2</Link>
        </li>
      </ul>
      <Link to="/cart">To cart page</Link>
    </>
  );
};

export default ProductsListPage;
