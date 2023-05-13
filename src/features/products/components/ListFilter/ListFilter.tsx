import React, { FC, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { IProductsState } from "../../productsSlice";
import {
  getCategoriesWithCount,
  getBrands,
  getMaxPrice,
} from "@/utils/products.utils";
import FilterPrice from "../FilterPrice/FilterPrice";
import arrowDownThin from "@/assets/images/arrow_down_thin.svg";
import fiveStars from "@/assets/images/stars_five.svg";
import fourStars from "@/assets/images/stars_four.svg";
import threeStars from "@/assets/images/stars_three.svg";
import twoStars from "@/assets/images/stars_two.svg";
import oneStars from "@/assets/images/stars_one.svg";
import "./ListFilter.scss";

const ListFilter: FC = () => {
  const { products } = useSelector<RootState, IProductsState>(
    (state) => state.products
  );

  const categories = getCategoriesWithCount(products);
  const brands = getBrands(products);
  const maxPrice = getMaxPrice(products);

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
        className={`filter ${showFilter ? "filter--show" : ""}`}
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
                  <p>{category.title}</p>
                  <span>{category.count}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="filter__block">
          <h3 className="filter__title">Brands</h3>
          <ul className="filter-brands">
            {brands.map((brand, index) => (
              <li key={`filterbrand-${brand}-${index}`}>
                <label className="filter__label">
                  <input className="filter__input" type="checkbox" />
                  <p>{brand}</p>
                </label>
              </li>
            ))}
          </ul>
        </div>
        <div className="filter__block">
          <h3 className="filter__title">Rating</h3>
          <ul className="filter-rating">
            <li>
              <label className="filter__label">
                <input className="filter__input" type="checkbox" />
                <img src={fiveStars} alt="Five Stars" />
              </label>
            </li>
            <li>
              <label className="filter__label">
                <input className="filter__input" type="checkbox" />
                <img src={fourStars} alt="Five Stars" />
              </label>
            </li>
            <li>
              <label className="filter__label">
                <input className="filter__input" type="checkbox" />
                <img src={threeStars} alt="Five Stars" />
              </label>
            </li>
            <li>
              <label className="filter__label">
                <input className="filter__input" type="checkbox" />
                <img src={twoStars} alt="Five Stars" />
              </label>
            </li>
            <li>
              <label className="filter__label">
                <input className="filter__input" type="checkbox" />
                <img src={oneStars} alt="Five Stars" />
              </label>
            </li>
          </ul>
        </div>
        <div className="filter__block">
          <h3 className="filter__title">Price</h3>
          <FilterPrice maxPrice={maxPrice} />
        </div>
        <button className="filter__reset">Reset</button>
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
