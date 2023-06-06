import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { AppDispatch, RootState } from "@Store/store";
import { IProductsState, selectProducts } from "@Products/productsSlice";
import { ERoutes } from "@/types/routes";
import { ICartState, selectCart } from "@Cart/cartSlice";
import { removeUser, showAuth } from "@Features/auth/authSlice";
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
  const navigate = useNavigate();
  const { isAuth, user } = useAuth();

  const { products } = useSelector<RootState, IProductsState>(selectProducts);
  const { cart } = useSelector<RootState, ICartState>(selectCart);
  const { wishlist } = useSelector<RootState, IWishlistState>(selectWishlist);
  const [showCategories, setShowCategories] = useState<boolean>(true);
  const [showProfileMenu, setShowProfileMenu] = useState<boolean>(false);

  const categoriesObj = getCategoriesObj(products);
  const categories = Object.keys(categoriesObj);
  const cartCount = cart.reduce(
    (acc, cartItem) => acc + cartItem.countArr.length,
    0
  );
  const userId = user ? user.user_id : null;
  const usersWishlist = wishlist.filter((item) => item.userId === userId);
  const showWishlist = !!usersWishlist.length && isAuth;

  const notifyLogOut = () => toast.warn("Logged Out successfully!");

  const toggleShowCategories = () => {
    setShowCategories((prev) => !prev);
  };

  const handleHideProfileMenu = () => {
    setShowProfileMenu(false);
  };

  const handleShowProfileMenu = () => {
    setShowProfileMenu(true);
  };

  const handleChoseProfile = () => {
    navigate(`/${ERoutes.PROFILE}`);
    handleHideProfileMenu();
  };

  const handleLogIn = () => {
    dispatch(showAuth());
    handleHideProfileMenu();
  };

  const handleLogOut = () => {
    dispatch(removeUser());
    handleHideProfileMenu();
    notifyLogOut();
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
          {showWishlist && (
            <Link to={`/${ERoutes.WISHLIST}`} className="controls__btn">
              <img src={heartIcon} alt="Wishlist" />
              <span>{usersWishlist.length}</span>
            </Link>
          )}
          <div
            className="controls__profile"
            onMouseLeave={handleHideProfileMenu}>
            <button
              type="button"
              className="controls__btn"
              onMouseEnter={handleShowProfileMenu}>
              <img src={userIcon} alt="User" />
            </button>
            {showProfileMenu && (
              <ul className="controls__dropdown">
                {isAuth ? (
                  <>
                    <li onClick={handleChoseProfile}>Profile</li>
                    <li onClick={handleLogOut}>Log Out</li>
                  </>
                ) : (
                  <li onClick={handleLogIn}>Log In</li>
                )}
              </ul>
            )}
          </div>
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
