import React, { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { AppDispatch, RootState } from "@Store/store";
import {
  clearWishlist,
  fetchWishlistProducts,
  IWishlistState,
  selectWishlist,
} from "@Wishlist/wishlistSlice";
import { useAuth } from "@/hooks/useAuth";
import { ERoutes } from "@/types/routes";
import { EBtnStyle, EBtnImage, EBtnImagePos } from "@/common/types/button";
import Button from "@CommonComponents/Button/Button";
import LoadinSpinner from "@CommonComponents/LoadingSpinner/LoadingSpinner";
import Suggested from "@CommonComponents/Suggested/Suggested";

import emptyWishlist from "@Images/wishlist_empty.svg";

import "./Wishlist.scss";

const Wishlist: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { isAuth, userId } = useAuth();
  const { wishlist, wishlistProducts, isWishlistLoading, wishlistError } =
    useSelector<RootState, IWishlistState>(selectWishlist);

  const filteredWishlist = wishlist.filter((item) => item.userId === userId);

  const notifyNotLoggedIn = () =>
    toast.warn("The Wishlist is available only to authorized users");

  const handleNavToProducts = () => {
    navigate(`/${ERoutes.PRODUCTS_LIST}`);
  };

  const handleClearWishlist = () => {
    dispatch(clearWishlist(userId));
  };

  useEffect(() => {
    if (wishlist.length) {
      dispatch(fetchWishlistProducts(filteredWishlist));
    }

    if (!isAuth) {
      navigate(`/${ERoutes.PRODUCTS_LIST}`);
      notifyNotLoggedIn();
    }
  }, []);

  useEffect(() => {
    if (!isAuth) {
      navigate(`/${ERoutes.PRODUCTS_LIST}`);
    }
  });

  if (isWishlistLoading && wishlist.length !== wishlistProducts.length) {
    return <LoadinSpinner />;
  }

  if (wishlistError) {
    return (
      <p className="wishlist__message">
        Server is busy! Please wait for 10 seconds and then try refreshing the
        page!
      </p>
    );
  }

  if (!filteredWishlist.length) {
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
          <Suggested
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
