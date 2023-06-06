import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import { AppDispatch, RootState } from "@Store/store";
import { IProductsState, selectProducts } from "@Products/productsSlice";
import { ERoutes } from "@/types/routes";
import { ICartState, selectCart } from "@Cart/cartSlice";
import { showAuth } from "@Features/auth/authSlice";
import {
  IWishlistState,
  selectWishlist,
} from "@Features/wishlist/wishlistSlice";
import { getCategoriesObj } from "@/utils/products";
import LinkItem from "@CommonComponents/LInkItem/LinkItem";
import { useAuth } from "@/hooks/useAuth";

import arrowDown from "@Images/arrow_down.svg";
import cartIcon from "@Images/basket.svg";
import heartIcon from "@Images/heart.svg";
import logo from "@Images/logo.svg";
import userIcon from "@Images/user.svg";

import Category from "./components/Category/Category";
import Search from "./components/Search/Search";

import "./Header.scss";

const Header = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isAuth } = useAuth();

  const { products } = useSelector<RootState, IProductsState>(selectProducts);
  const { cart } = useSelector<RootState, ICartState>(selectCart);
  const { wishlist } = useSelector<RootState, IWishlistState>(selectWishlist);
  const [showCategories, setShowCategories] = useState<boolean>(true);

  const categoriesObj = getCategoriesObj(products);
  const categories = Object.keys(categoriesObj);
  const cartCount = cart.reduce(
    (acc, cartItem) => acc + cartItem.countArr.length,
    0
  );

  const notifyNotLoggedIn = () => toast.warn("Log In first!");

  const toggleShowCategories = () => {
    setShowCategories((prev) => !prev);
  };

  const handleOpenUserPage = () => {
    if (!isAuth) {
      notifyNotLoggedIn();
      dispatch(showAuth());
    }
  };

  return (
    <header className="header">
      <div className="header__links">
        <ul className="header__contacts">
          <li>
            <LinkItem type="small" title="Chat with us" />
          </li>
          <li>
            <a className="header__link" href="tel:+420336775664">
              +420 336 775 664
            </a>
          </li>
          <li>
            <a className="header__link" href="mailto:info@freshnesecom.com">
              info@freshnesecom.com
            </a>
          </li>
        </ul>
        <ul className="header__pages">
          <li>
            <LinkItem type="small" title="Blog" />
          </li>
          <li>
            <LinkItem type="small" title="About Us" />
          </li>
          <li>
            <LinkItem type="small" title="Careers" />
          </li>
        </ul>
      </div>
      <div className="header__main">
        <Link to="/">
          <img className="header__logo" src={logo} alt="Freshnesecom" />
        </Link>
        <Search />
        <div className="controls">
          {!!wishlist.length && (
            <Link to={`/${ERoutes.WISHLIST}`} className="controls__btn">
              <img src={heartIcon} alt="Wishlist" />
              <span>{wishlist.length}</span>
            </Link>
          )}
          <button
            type="button"
            className="controls__btn"
            onClick={handleOpenUserPage}>
            <img src={userIcon} alt="User" />
          </button>
          <Link to={`/${ERoutes.CART}`} className="controls__btn">
            <img src={cartIcon} alt="Cart" />
            {!!cartCount && <span>{cartCount}</span>}
          </Link>
        </div>
      </div>
      <button
        className="category__hider"
        type="button"
        onClick={toggleShowCategories}>
        Categories
        <img
          className={`${!showCategories ? "rotate__icon" : ""}`}
          src={arrowDown}
          alt="DownArrow"
        />
      </button>
      <nav>
        <ul
          className={`header__categories${
            showCategories ? " header__categories--hide" : ""
          }`}>
          {categories.map((category, index) => (
            <Category
              key={`cat-${category}-${index}`}
              category={category}
              brands={categoriesObj[category].brands}
            />
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
