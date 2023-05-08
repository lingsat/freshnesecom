import React, { FC } from "react";
import { Link, useParams } from "react-router-dom";

const ProductItem: FC = () => {
  const { id } = useParams();

  return (
    <div>
      <h2>Product {id}</h2>
      <Link to="/">Back to product list</Link>
    </div>
  );
};

export default ProductItem;
