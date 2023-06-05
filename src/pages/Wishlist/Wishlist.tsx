import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "@Store/store";
import {
  clearWishlist,
  IProductsState,
  selectProducts,
} from "@Products/productsSlice";
import { getWishlistProducts } from "@/utils/products";
import { ERoutes } from "@/types/routes";
import Button, {
  EBtnImage,
  EBtnImagePos,
  EBtnStyle,
} from "@CommonComponents/Button/Button";
import LoadinSpinner from "@CommonComponents/LoadingSpinner/LoadingSpinner";
import SuggestedCard from "@CommonComponents/SuggestedCard/SuggestedCard";

import emptyWishlist from "@Images/wishlist_empty.svg";

import "./Wishlist.scss";

const Wishlist: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { products, loading, wishlist } = useSelector<
    RootState,
    IProductsState
  >(selectProducts);

  const wishlistProducts = getWishlistProducts(products, wishlist);

  const handleNavToProducts = () => {
    navigate(`/${ERoutes.PRODUCTS_LIST}`);
  };

  const handleClearWishlist = () => {
    dispatch(clearWishlist());
  };

  if (loading) {
    return <LoadinSpinner />;
  }

  if (!wishlist.length) {
    return (
      <div className="wishlist__empty">
        <p className="wishlist__message">Oops! Your wish list is empty!</p>
        <img
          className="wishlist__image"
          src={emptyWishlist}
          alt="Empty Wishlist"
        />
        <Button
          text="Back to Products"
          style={EBtnStyle.BIG}
          onCLick={handleNavToProducts}
        />
      </div>
    );
  }

  return (
    <div className="wishlist">
      <div className="wishlist__header">
        <h2 className="wishlist__title">Wish list</h2>
        <Button
          text="Clear wish list"
          style={EBtnStyle.SECONDARY}
          image={EBtnImage.CLOSE}
          imagePosition={EBtnImagePos.LEFT}
          onCLick={handleClearWishlist}
        />
      </div>
      <ul className="wishlist__list">
        {wishlistProducts.map((product, index) => (
          // <Suggested
          //   key={`wish-${product.id}-${index}`}
          //   product={product}
          //   showRemoveBtn={true}
          // />
          <SuggestedCard
            key={`wish-${product.id}-${index}`}
            product={product}
            showRemoveBtn={true}
          />
        ))}
      </ul>
    </div>
  );
};

export default Wishlist;
