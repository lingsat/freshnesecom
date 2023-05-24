import React, { FC, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import { AppDispatch } from "@Store/store";
import { changeSingleBrand } from "@Products/productsSlice";
import { ERoutes } from "@/types/routes";
import DropDown from "@CommonComponents/DropDown/DropDown";

import arrowDownThin from "@Images/arrow_down_thin.svg";

import "./Category.scss";

interface CategoryProps {
  category: string;
  brands: string[];
}

const Category: FC<CategoryProps> = ({ category, brands }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [showMenu, setShowMenu] = useState<boolean>(false);

  const handleHideMenu = () => {
    setShowMenu(false);
  };

  const handleShowMenu = () => {
    setShowMenu(true);
  };

  const handleChooseBrand = (brand: string) => {
    handleHideMenu();
    if (pathname !== ERoutes.PRODUCTS_LIST) {
      navigate(ERoutes.PRODUCTS_LIST);
    }
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
      {showMenu && <DropDown list={brands} onClick={handleChooseBrand} />}
    </li>
  );
};

export default Category;
