import React, { FC, useState } from "react";
import arrowDown from "@/assets/images/arrow_down.svg";
import { categories } from "@/mock/categories";
import "./Selector.scss";

interface SelectorProps {
  title: string;
  setSearchCategory: React.Dispatch<React.SetStateAction<string>>;
}

const Selector: FC<SelectorProps> = ({ title, setSearchCategory }) => {
  const [showMenu, setShowMenu] = useState<boolean>(false);

  const handleHideMenu = () => {
    setShowMenu(false);
  };

  const handleShowMenu = () => {
    setShowMenu(true);
  };

  const handleSetCategory = (newCategory: string) => () => {
    setSearchCategory(newCategory);
    handleHideMenu();
  };

  return (
    <div className="selector" onMouseLeave={handleHideMenu}>
      <div className="selector__btn" onMouseEnter={handleShowMenu}>
        {title}
        <img
          className={`${showMenu && "reverse__icon"}`}
          src={arrowDown}
          alt="DownArrow"
        />
      </div>
      <ul className={`selector__menu ${showMenu && "selector__menu--show"}`}>
        <li
          className="selector__link"
          onClick={handleSetCategory("All categories")}>
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
