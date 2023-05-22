import React, { FC, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { RootState } from "@Store/store";
import { IProductsState, selectProducts } from "@Products/productsSlice";
import { getCategoriesObj } from "@/utils/products";
import LinkItem from "@CommonComponents/LInkItem/LinkItem";

import arrowDown from "@Images/arrow_down.svg";
import cartIcon from "@Images/basket.svg";
import logo from "@Images/logo.svg";
import userIcon from "@Images/user.svg";

import Category from "./components/Category/Category";
import Search from "./components/Search/Search";
import "./Header.scss";

const Header: FC = () => {
  const { products } = useSelector<RootState, IProductsState>(selectProducts);
  const [showCategories, setShowCategories] = useState<boolean>(true);

  const categoriesObj = getCategoriesObj(products);
  const categories = Object.keys(categoriesObj);

  const toggleShowCategories = () => {
    setShowCategories((prev) => !prev);
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
          <button type="button" className="controls__btn">
            <img src={userIcon} alt="User" />
          </button>
          <button type="button" className="controls__btn">
            <img src={cartIcon} alt="Cart" />
            <span>4</span>
          </button>
        </div>
      </div>
      <button
        className="category__hider"
        type="button"
        onClick={toggleShowCategories}>
        Categories
        <img
          className={`${!showCategories && "rotate__icon"}`}
          src={arrowDown}
          alt="DownArrow"
        />
      </button>
      <nav>
        <ul
          className={`header__categories ${
            showCategories ? "header__categories--hide" : ""
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
