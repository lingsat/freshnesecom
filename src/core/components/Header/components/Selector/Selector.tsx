import React, { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import {
  changeCategory,
  IProductsState,
} from "@/features/products/productsSlice";
import arrowDown from "@/assets/images/arrow_down.svg";
import "./Selector.scss";

const Selector: FC = () => {
  const [showMenu, setShowMenu] = useState<boolean>(false);

  const { category, products } = useSelector<RootState, IProductsState>(
    (state) => state.products
  );
  const dispatch = useDispatch<AppDispatch>();

  const categories = products.reduce((acc: string[], product) => {
    if (!acc.includes(product.category)) {
      acc.push(product.category);
    }
    return acc;
  }, []);

  const handleHideMenu = () => {
    setShowMenu(false);
  };

  const handleShowMenu = () => {
    setShowMenu(true);
  };

  const handleSetCategory = (newCategory: string) => () => {
    dispatch(changeCategory(newCategory));
    handleHideMenu();
  };

  return (
    <div className="selector" onMouseLeave={handleHideMenu}>
      <div className="selector__btn" onMouseEnter={handleShowMenu}>
        {category || "All Categories"}
        <img
          className={`${showMenu && "reverse__icon"}`}
          src={arrowDown}
          alt="DownArrow"
        />
      </div>
      <ul className={`selector__menu ${showMenu && "selector__menu--show"}`}>
        <li className="selector__link" onClick={handleSetCategory("")}>
          All categories
        </li>
        {categories.map((category, index) => (
          <li
            key={`selector-${category}-${index}`}
            className="selector__link"
            onClick={handleSetCategory(category)}>
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Selector;
