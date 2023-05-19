import React, { FC, useState } from "react";
import { useDispatch } from "react-redux";

import { AppDispatch } from "@Store/store";
import { changeSortRule } from "@Products/productsSlice";
import DropDown from "@CommonComponents/DropDown/DropDown";
import { ESort } from "@Products/types/product";

import arrowIcon from "@Images/arrow_black.svg";
import "./Sort.scss";

interface SortProps {
  sortRule: string;
}

const Sort: FC<SortProps> = ({ sortRule }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [showMenu, setShowMenu] = useState<boolean>(false);

  const sortRuleArr = Object.values(ESort);

  const handleHideMenu = () => {
    setShowMenu(false);
  };

  const handleShowMenu = () => {
    setShowMenu(true);
  };

  const handleSetSortRule = (newSortRule: string) => {
    dispatch(changeSortRule(newSortRule));
    handleHideMenu();
  };

  return (
    <div className="sort">
      <p className="sort__text">Sort by</p>
      <div className="sort__selector" onMouseLeave={handleHideMenu}>
        <div className="sort__btn" onMouseEnter={handleShowMenu}>
          {sortRule ? sortRule : "Select"}
          <img
            className={`${showMenu && "reverse__icon"}`}
            src={arrowIcon}
            alt="DownArrow"
          />
        </div>
        {showMenu && (
          <DropDown
            list={sortRuleArr}
            onClick={handleSetSortRule}
            clearValue="Clear"
            position="center"
          />
        )}
      </div>
    </div>
  );
};

export default Sort;
