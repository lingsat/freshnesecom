import React, { FC, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { getCategoriesWithBrands } from "@/utils/products.utils";
import { IProductsState } from "@/features/products/productsSlice";
import LinkItem from "@/common/components/LInkItem/LinkItem";
import Search from "./components/Search/Search";
import Category from "./components/Category/Category";
import logo from "@/assets/images/logo.svg";
import arrowDown from "@/assets/images/arrow_down.svg";
import userIcon from "@/assets/images/user.svg";
import cartIcon from "@/assets/images/basket.svg";
import "./Header.scss";

const Header: FC = () => {
  const { products } = useSelector<RootState, IProductsState>(
    (state) => state.products
  );
  const [showCategories, setShowCategories] = useState<boolean>(true);

  const categoriesWithBrands = getCategoriesWithBrands(products);
  const categories = Object.keys(categoriesWithBrands);

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
              title={category}
              brands={categoriesWithBrands[category]}
            />
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
