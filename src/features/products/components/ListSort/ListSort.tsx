import React, { FC, useState } from "react";
import arrowIcon from "@/assets/images/arrow_black.svg";
import "./ListSort.scss";

const ListSort: FC = () => {
  const [sortRule, setSortRule] = useState<string>("");
  const [showMenu, setShowMenu] = useState<boolean>(false);

  const handleHideMenu = () => {
    setShowMenu(false);
  };

  const handleShowMenu = () => {
    setShowMenu(true);
  };

  const handleSetCategory = (newSort: string) => () => {
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
          <li className="sort__link" onClick={handleSetCategory("")}>
            Clear
          </li>
          <li className="sort__link" onClick={handleSetCategory("Asc")}>
            Asc
          </li>
          <li className="sort__link" onClick={handleSetCategory("Desc")}>
            Desc
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ListSort;
