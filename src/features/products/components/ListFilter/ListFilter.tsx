import React, { ChangeEvent, FC, useState } from "react";
import ReactSlider from "react-slider";
import { ICategoryWithCount } from "@products/types/caregory.interface";
import arrowDownThin from "@/assets/images/arrow_down_thin.svg";
import fiveStars from "@/assets/images/stars_five.svg";
import fourStars from "@/assets/images/stars_four.svg";
import threeStars from "@/assets/images/stars_three.svg";
import twoStars from "@/assets/images/stars_two.svg";
import oneStars from "@/assets/images/stars_one.svg";
import "./ListFilter.scss";

interface ListFilterProps {
  categories: ICategoryWithCount[];
  brands: string[];
}

const ListFilter: FC<ListFilterProps> = ({ categories, brands }) => {
  const [showFilter, setShowFIlter] = useState<boolean>(false);

  const [priceValues, setPriceValues] = useState<number[]>([0, 500]);

  const changeMinPrice = (event: ChangeEvent<HTMLInputElement>) => {
    setPriceValues((prevValues) => [+event.target.value, prevValues[1]]);
  };

  const changeMaxPrice = (event: ChangeEvent<HTMLInputElement>) => {
    setPriceValues((prevValues) => [prevValues[0], +event.target.value]);
  };

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
                  <p>{category.title}</p>
                  <span>{category.count}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="filter__block">
          <h3 className="filter__title">Brands</h3>
          <form className="filter-brands">
            {brands.map((brand, index) => (
              <label
                key={`filterbrand-${brand}-${index}`}
                className="filter__label">
                <input className="filter__input" type="checkbox" />
                <p>{brand}</p>
              </label>
            ))}
          </form>
        </div>
        <div className="filter__block">
          <h3 className="filter__title">Rating</h3>
          <form className="filter-rating">
            <label className="filter__label">
              <input className="filter__input" type="checkbox" />
              <img src={fiveStars} alt="Five Stars" />
            </label>
            <label className="filter__label">
              <input className="filter__input" type="checkbox" />
              <img src={fourStars} alt="Five Stars" />
            </label>
            <label className="filter__label">
              <input className="filter__input" type="checkbox" />
              <img src={threeStars} alt="Five Stars" />
            </label>
            <label className="filter__label">
              <input className="filter__input" type="checkbox" />
              <img src={twoStars} alt="Five Stars" />
            </label>
            <label className="filter__label">
              <input className="filter__input" type="checkbox" />
              <img src={oneStars} alt="Five Stars" />
            </label>
          </form>
        </div>
        <div className="filter__block">
          <h3 className="filter__title">Price</h3>
          <ReactSlider
            className="price-slider"
            thumbClassName="price-slider__thumb"
            trackClassName="price-slider__track"
            value={priceValues}
            onChange={setPriceValues}
            min={0}
            max={500}
            pearling
            minDistance={5}
          />
          <form className="filter-price">
            <label className="filter-price__label">
              Min
              <input
                className="filter-price__input"
                type="number"
                value={priceValues[0]}
                onChange={changeMinPrice}
              />
            </label>
            <label className="filter-price__label">
              Max
              <input
                className="filter-price__input"
                type="number"
                value={priceValues[1]}
                onChange={changeMaxPrice}
              />
            </label>
          </form>
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
