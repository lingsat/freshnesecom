import React, { FC, useState } from "react";
import { Link } from "react-router-dom";
import LinkItem from "@/common/components/LInkItem/LinkItem";
import Search from "./components/Search/Search";
import Category from "./components/Category/Category";
import logo from "@/assets/images/logo.svg";
import arrowDown from "@/assets/images/arrow_down.svg";
import userIcon from "@/assets/images/user.svg";
import cartIcon from "@/assets/images/basket.svg";
import { categories } from "@/mock/categories";
import "./Header.scss";

const Header: FC = () => {
  const [showCategories, setShowCategories] = useState<boolean>(true);

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
          <img src={logo} alt="Freshnesecom" />
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
      <ul
        className={`header__categories ${
          showCategories && "header__categories--hide"
        }`}>
        {categories.map((category, index) => (
          <li key={`cat-${category}-${index}`}>
            <Category title={category} />
          </li>
        ))}
      </ul>
    </header>
  );
};

export default Header;
