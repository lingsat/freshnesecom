import React, { ChangeEvent, FC, useState } from "react";
import LinkItem from "@/common/components/LInkItem/LinkItem";
import Category from "./components/Category/Category";
import Selector from "./components/Selector/Selector";
import logo from "@/assets/images/logo.svg";
import arrowDown from "@/assets/images/arrow_down.svg";
import searchIcon from "@/assets/images/search.svg";
import closeIcon from "@/assets/images/close.svg";
import userIcon from "@/assets/images/user.svg";
import cartIcon from "@/assets/images/basket.svg";
import "./Header.scss";

const categories = [
  "Electronics",
  "Food",
  "Clothes",
  "Skin and care",
  "Toys",
  "Special nutrition",
  "Sports and outdors",
  "Books",
];

const Header: FC = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [searchCategory, setSearchCategory] =
    useState<string>("All categories");
  const [showCategories, setShowCategories] = useState<boolean>(true);

  const toggleShowCategories = () => {
    setShowCategories((prev) => !prev);
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const clearSearch = () => {
    setSearchValue("");
  };

  return (
    <header className="header">
      <div className="header__links">
        <div className="header__contacts">
          <LinkItem type="small" title="Chat with us" />
          <a className="header__link" href="tel:+420336775664">
            +420 336 775 664
          </a>
          <a className="header__link" href="mailto:info@freshnesecom.com">
            info@freshnesecom.com
          </a>
        </div>
        <div className="header__pages">
          <LinkItem type="small" title="Blog" />
          <LinkItem type="small" title="About Us" />
          <LinkItem type="small" title="Careers" />
        </div>
      </div>
      <div className="header__main">
        <a href="/#">
          <img src={logo} alt="Freshnesecom" />
        </a>
        <div className="search">
          <Selector
            title={searchCategory}
            setSearchCategory={setSearchCategory}
            categories={categories}
          />
          <form>
            <label className="search__label">
              <input
                className="search__input"
                type="text"
                placeholder="Search Products, categories ..."
                value={searchValue}
                onChange={handleSearchChange}
              />
              {searchValue ? (
                <button
                  className="search__clear"
                  type="button"
                  onClick={clearSearch}>
                  <img src={closeIcon} alt="Close" />
                </button>
              ) : (
                <img className="search__icon" src={searchIcon} alt="Search" />
              )}
            </label>
          </form>
        </div>
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
      <div
        className={`header__categories ${
          showCategories && "header__categories--hide"
        }`}>
        {categories.map((category, index) => (
          <Category key={`cat-${category}-${index}`} title={category} />
        ))}
      </div>
    </header>
  );
};

export default Header;
