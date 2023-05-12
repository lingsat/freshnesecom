import React, { FC, useState } from "react";
import arrowDownThin from "@/assets/images/arrow_down_thin.svg";
import { categories } from "@/mock/categories";
import { brands } from "@/mock/brands";
import "./ListFilter.scss";

const ListFilter: FC = () => {
  const [showFilter, setShowFIlter] = useState<boolean>(false);

  const handleFilterHide = () => {
    setShowFIlter(false);
  };

  const handleFilterShow = () => {
    setShowFIlter(true);
  };

  return (
    <>
      <div
        className={`filter ${showFilter && "filter--show"}`}
        onMouseEnter={handleFilterShow}
        onMouseLeave={handleFilterHide}>
        <div className="filter__block">
          <h3 className="filter__title">Categories</h3>
          <ul className="filter-categories">
            {categories.map((category, index) => (
              <li
                key={`filterCat-${category}-${index}`}
                className="filter-categories__item">
                <button className="filter-categories__btn">
                  <p>{category}</p>
                  <span>125</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="filter__block">
          <h3 className="filter__title">Brands</h3>
          <form className="filter-brands">
            {brands.map((brand, index) => (
              <fieldset
                key={`filterBrand-${brand}-${index}`}
                className="filter-brands__item">
                <input
                  className="filter-brands__input"
                  type="checkbox"
                  name={brand}
                  id={brand}
                />
                <label className="filter-brands__label" htmlFor={brand}>
                  {brand}
                </label>
              </fieldset>
            ))}
          </form>
        </div>
      </div>
      <div
        className="filter__switcher"
        onMouseEnter={handleFilterShow}
        onMouseLeave={handleFilterHide}>
        Show Filter
        <img
          className={`${showFilter && "reverse__icon"}`}
          src={arrowDownThin}
          alt="DownArrow"
        />
      </div>
    </>
  );
};

export default ListFilter;
