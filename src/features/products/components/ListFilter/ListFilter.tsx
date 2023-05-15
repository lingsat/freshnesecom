import React, { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import {
  clearAllFilters,
  IProductsState,
  toggleBrands,
  toggleCategory,
  toggleStars,
} from "@products/productsSlice";
import {
  getBrands,
  getCategoriesObj,
  getMinMaxPrice,
} from "@/utils/products.utils";
import FilterPrice from "@products/components/FilterPrice/FilterPrice";
import FilterStars from "@products/components/FilterStars/FilterStars";
import { EStars } from "@products/types/start.enum";
import arrowDownThin from "@/assets/images/arrow_down_thin.svg";
import "./ListFilter.scss";

const starsArr = Object.values(EStars);

const ListFilter: FC = () => {
  const { products, filter } = useSelector<RootState, IProductsState>(
    (state) => state.products
  );
  const dispatch = useDispatch<AppDispatch>();

  const categoriesObj = getCategoriesObj(products);
  const categories = Object.keys(categoriesObj);
  const brands = getBrands(categoriesObj, filter.category);
  const priceMinMax = getMinMaxPrice(products);

  const [showFilter, setShowFIlter] = useState<boolean>(false);

  const toggleFilter = () => {
    setShowFIlter((prev) => !prev);
  };

  const handleFilterPropagation = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  const handleChooseCategory = (category: string) => () => {
    dispatch(toggleCategory(category));
  };

  const handleChooseBrand = (brand: string) => () => {
    dispatch(toggleBrands(brand));
  };

  const handleChooseStar = (star: string) => () => {
    dispatch(toggleStars(+star));
  };

  const handleFilterReset = () => {
    dispatch(clearAllFilters());
  };

  useEffect(() => {
    if (showFilter) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "unset";
      };
    }
  }, [showFilter]);

  return (
    <>
      <div
        className={`filter__wrapper ${
          showFilter ? "filter__wrapper--show" : ""
        }`}
        onClick={toggleFilter}>
        <aside className="filter" onClick={handleFilterPropagation}>
          <div className="filter__block">
            <h3 className="filter__title">Categories</h3>
            <ul className="filter-categories">
              {categories.map((category, index) => (
                <li
                  key={`filterCat-${category}-${index}`}
                  className={`filter-categories__item ${
                    filter.category === category
                      ? "filter-categories__item--active"
                      : ""
                  }`}
                  onClick={handleChooseCategory(category)}>
                  <p>{category}</p>
                  <span>{categoriesObj[category].count}</span>
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
                    <input
                      className="filter__input"
                      type="checkbox"
                      checked={filter.brands.includes(brand)}
                      onChange={handleChooseBrand(brand)}
                    />
                    <p>{brand}</p>
                  </label>
                </li>
              ))}
            </ul>
          </div>
          <div className="filter__block">
            <h3 className="filter__title">Rating</h3>
            <ul className="filter-rating">
              {starsArr.map((starCount, index) => (
                <li key={`filterstars-${starCount}-${index}`}>
                  <label className="filter__label">
                    <input
                      className="filter__input"
                      type="checkbox"
                      checked={filter.stars.includes(+starCount)}
                      onChange={handleChooseStar(starCount)}
                    />
                    <FilterStars checkedStars={starCount} />
                  </label>
                </li>
              ))}
            </ul>
          </div>
          <div className="filter__block">
            <h3 className="filter__title">Price</h3>
            <FilterPrice priceMinMax={priceMinMax} />
          </div>
          <button className="filter__reset" onClick={handleFilterReset}>
            Reset
          </button>
        </aside>
      </div>
      <button className="filter__switcher" type="button" onClick={toggleFilter}>
        Show Filter
        <img
          className={`${showFilter && "reverse__icon"}`}
          src={arrowDownThin}
          alt="DownArrow"
        />
      </button>
    </>
  );
};

export default ListFilter;
