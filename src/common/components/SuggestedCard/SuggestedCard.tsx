import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { AppDispatch } from "@Store/store";
import { toggleWishlistItem } from "@Products/productsSlice";
import { getOldPrice } from "@Products/utils/products";
import { IProduct } from "@Products/types/product";
import { ERoutes } from "@/types/routes";
import { EBtnStyle } from "@/common/types/button";
import Button from "@CommonComponents/Button/Button";

import close from "@Images/close.svg";

import "./SuggestedCard.scss";

interface SuggestedCardProps {
  product: IProduct;
  showRemoveBtn?: boolean;
}

const SuggestedCard: FC<SuggestedCardProps> = ({
  product,
  showRemoveBtn = false,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const oldPrice = getOldPrice(product.mainPrice, product.discount);

  const handleOpenProduct = () => {
    navigate(`/${ERoutes.PRODUCTS_LIST}/${product.id}`);
  };

  const handleToggleWishlist = () => {
    dispatch(toggleWishlistItem(product.id));
  };

  return (
    <div className="suggested">
      <p className="suggested__discount">- {product.discount} %</p>
      {showRemoveBtn && (
        <button className="suggested__remove" onClick={handleToggleWishlist}>
          <img src={close} alt="Close" />
          Remove
        </button>
      )}
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
        <div>
          <p className="suggested__price">{product.mainPrice} USD</p>
          <p className="suggested__oldprice">{oldPrice}</p>
        </div>
        <Button
          text="Buy now"
          style={EBtnStyle.SMALL}
          onCLick={handleOpenProduct}
        />
      </div>
    </div>
  );
};

export default SuggestedCard;
