import React, { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "@Store/store";
import {
  changeCategory,
  clearAllFilters,
  IProductsState,
  selectProducts,
  toggleBrands,
  toggleStars,
} from "@Products/productsSlice";
import { getCategoriesObj } from "@/utils/products";
import { getBrands } from "@Products/utils/products";
import { EStars } from "@Products/types/product";
import Stars from "@CommonComponents/Stars/Stars";
import FilterPrice from "@ProductsComponents/FilterPrice/FilterPrice";

import "./Filter.scss";

const starsArr = Object.values(EStars);

interface FilterProps {
  showFilter: boolean;
  toggleFilter: () => void;
}

const Filter: FC<FilterProps> = ({ showFilter, toggleFilter }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { products, filter } = useSelector<RootState, IProductsState>(
    selectProducts
  );

  const categoriesObj = getCategoriesObj(products);
  const categories = Object.keys(categoriesObj);
  const brands = getBrands(categoriesObj, filter.category);

  const isChecked = <T,>(array: T[], value: T) => {
    return array.includes(value);
  };

  const handleFilterPropagation = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  const handleChooseCategory = (category: string) => () => {
    dispatch(changeCategory(category));
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
        className={`overlay${showFilter ? " overlay--show" : ""}`}
        onClick={toggleFilter}></div>
      <aside
        className={`filter${showFilter ? " filter--show" : ""}`}
        onClick={handleFilterPropagation}>
        <div className="filter__block">
          <h3 className="filter__title">Categories</h3>
          <ul className="filter-categories">
            <li
              className={`filter-categories__item${
                !filter.category ? " filter-categories__item--active" : ""
              }`}
              onClick={handleChooseCategory("")}>
              <p>All categories</p>
              <span>{products.length}</span>
            </li>
            {categories.map((category, index) => (
              <li
                key={`filterCat-${category}-${index}`}
                className={`filter-categories__item${
                  filter.category === category
                    ? " filter-categories__item--active"
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
                    checked={isChecked(filter.brands, brand)}
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
                    checked={isChecked(filter.stars, +starCount)}
                    onChange={handleChooseStar(starCount)}
                  />
                  <Stars checkedStars={starCount} />
                </label>
              </li>
            ))}
          </ul>
        </div>
        <div className="filter__block">
          <h3 className="filter__title">Price</h3>
          <FilterPrice />
        </div>
        <button className="filter__reset" onClick={handleFilterReset}>
          Reset
        </button>
      </aside>
    </>
  );
};

export default Filter;
