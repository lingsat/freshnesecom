import React, { FC } from "react";
import { Link } from "react-router-dom";

const ProductsList: FC = () => {
  return (
    <ul>
      Product List
      <li>
        <Link to="/1">Product 1</Link>
      </li>
      <li>
        <Link to="/2">Product 2</Link>
      </li>
    </ul>
  );
};

export default ProductsList;
