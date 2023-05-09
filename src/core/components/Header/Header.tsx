import LinkItem from "@/common/components/LInkItem/LinkItem";
import React, { ChangeEvent, FC, useState } from "react";
import logo from "@/assets/images/logo.svg";
import arrowDown from "@/assets/images/arrow_down.svg";
import arrowDownThin from "@/assets/images/arrow_down_thin.svg";
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
        <a href="/">
          <img src={logo} alt="Freshnesecom" />
        </a>
        <div className="search">
          <button className="search__btn" type="button">
            All categories
            <img src={arrowDown} alt="DownArrow" />
          </button>
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
      <div className="header__categories">
        {categories.map((category, index) => (
          <button
            key={`cat-${category}-${index}`}
            className="header__categories-btn"
            type="button">
            {category}
            <img src={arrowDownThin} alt="DownArrow" />
          </button>
        ))}
      </div>
    </header>
  );
};

export default Header;
