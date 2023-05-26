import React, { FC } from "react";
import { useNavigate } from "react-router-dom";

import { IProduct } from "@Products/types/product";
import { ERoutes } from "@/types/routes";
import Button, { EBtnStyle } from "@CommonComponents/Button/Button";

import "./Suggested.scss";

interface SuggestedProps {
  product: IProduct;
}

const Suggested: FC<SuggestedProps> = ({ product }) => {
  const navigate = useNavigate();

  const handleOpenProduct = () => {
    navigate(`/${ERoutes.PRODUCTS_LIST}/${product.id}`);
  };

  return (
    <div className="suggested">
      <p className="suggested__discount">- {product.discount} %</p>
      <img
        className="suggested__image"
        src={product.images[0]}
        alt={product.title}
        onClick={handleOpenProduct}
      />
      <h4 className="suggested__title" onClick={handleOpenProduct}>
        {product.title}
      </h4>
      <p className="suggested__description">{product.shortDescription}</p>
      <div className="suggested__block">
        <p className="suggested__price">{product.mainPrice} USD</p>
        <Button text="Buy now" style={EBtnStyle.SMALL} />
      </div>
    </div>
  );
};

export default Suggested;
