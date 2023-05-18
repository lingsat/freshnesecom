import React, { FC, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { changeSortRule } from "@products/productsSlice";
import arrowIcon from "@/assets/images/arrow_black.svg";
import { ESort } from "@products/types/product";
import "./ListSort.scss";

interface ListSortProps {
  sortRule: ESort;
}

const ListSort: FC<ListSortProps> = ({ sortRule }) => {
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

export default ListSort;
