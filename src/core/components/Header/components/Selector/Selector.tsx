import React, { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "@Store/store";
import {
  changeCategory,
  IProductsState,
  selectProducts,
} from "@Products/productsSlice";
import { getCategoriesObj } from "@/utils/products";
import DropDown from "@CommonComponents/DropDown/DropDown";

import arrowDown from "@Images/arrow_down.svg";

import "./Selector.scss";

const Selector: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products, filter } = useSelector<RootState, IProductsState>(
    selectProducts
  );

  const [showMenu, setShowMenu] = useState<boolean>(false);

  const categories = Object.keys(getCategoriesObj(products));

  const handleHideMenu = () => {
    setShowMenu(false);
  };

  const handleShowMenu = () => {
    setShowMenu(true);
  };

  const handleSetCategory = (newCategory: string) => {
    dispatch(changeCategory(newCategory));
    handleHideMenu();
  };

  return (
    <div className="selector" onMouseLeave={handleHideMenu}>
      <div className="selector__btn" onMouseEnter={handleShowMenu}>
        {filter.category || "All Categories"}
        <img
          className={`${showMenu && "reverse__icon"}`}
          src={arrowDown}
          alt="DownArrow"
        />
      </div>
      {showMenu && (
        <DropDown
          list={categories}
          onClick={handleSetCategory}
          clearValue="All categories"
          position="center"
        />
      )}
    </div>
  );
};

export default Selector;
