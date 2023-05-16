import React, { FC, useState } from "react";
import arrowIcon from "@/assets/images/arrow_black.svg";
import "./ListSort.scss";
import { ESort } from "../../types/sort.enum";

const ListSort: FC = () => {
  const [sortRule, setSortRule] = useState<ESort>(ESort.CLEAR);
  const [showMenu, setShowMenu] = useState<boolean>(false);

  const sortRuleArr = Object.values(ESort);
  console.log(sortRuleArr);

  const handleHideMenu = () => {
    setShowMenu(false);
  };

  const handleShowMenu = () => {
    setShowMenu(true);
  };

  const handleSetSortRule = (newSort: ESort) => () => {
    setSortRule(newSort);
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
