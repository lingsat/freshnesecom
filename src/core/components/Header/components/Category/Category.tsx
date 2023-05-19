import React, { FC, useState } from "react";
import { useDispatch } from "react-redux";

import { AppDispatch } from "@Store/store";
import { changeSingleBrand } from "@Products/productsSlice";

import arrowDownThin from "@Images/arrow_down_thin.svg";
import "./Category.scss";

interface CategoryProps {
  category: string;
  brands: string[];
}

const Category: FC<CategoryProps> = ({ category, brands }) => {
  const [showMenu, setShowMenu] = useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>();

  const handleHideMenu = () => {
    setShowMenu(false);
  };

  const handleShowMenu = () => {
    setShowMenu(true);
  };

  const handleChooseBrand = (brand: string) => () => {
    dispatch(changeSingleBrand({ brand, category }));
  };

  return (
    <li className="category" onMouseLeave={handleHideMenu}>
      <div className="category__item" onMouseEnter={handleShowMenu}>
        {category}
        <img
          className={`${showMenu ? "reverse__icon" : ""}`}
          src={arrowDownThin}
          alt="DownArrow"
        />
      </div>
      <ul
        className={`category__menu ${showMenu ? "category__menu--show" : ""}`}>
        {brands.map((brand, index) => (
          <li
            key={`brand-${brand}-${index}`}
            className="category__link"
            onClick={handleChooseBrand(brand)}>
            {brand}
          </li>
        ))}
      </ul>
    </li>
  );
};

export default Category;
