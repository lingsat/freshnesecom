import React, { FC, useState } from "react";
import { useDispatch } from "react-redux";

import { AppDispatch } from "@Store/store";
import { changeSortRule } from "@Products/productsSlice";
import { ESort } from "@Products/types/product";

import arrowIcon from "@Images/arrow_black.svg";
import "./Sort.scss";

interface SortProps {
  sortRule: ESort;
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

  const handleSetSortRule = (newSortRule: ESort) => () => {
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
        <ul className={`sort__menu ${showMenu && "sort__menu--show"}`}>
          {sortRuleArr.map((rule, index) => (
            <li
              key={`sortrule-${rule}-${index}`}
              className="sort__link"
              onClick={handleSetSortRule(rule)}>
              {rule || "Clear"}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sort;
