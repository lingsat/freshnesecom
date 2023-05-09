import React, { FC, useState } from "react";
import arrowDownThin from "@/assets/images/arrow_down_thin.svg";
import "./Category.scss";

const brands = ["Samsung", "Sony", "Apple"];

interface CategoryProps {
  title: string;
}

const Category: FC<CategoryProps> = ({ title }) => {
  const [showMenu, setShowMenu] = useState<boolean>(false);

  const handleHideMenu = () => {
    setShowMenu(false);
  };

  const handleShowMenu = () => {
    setShowMenu(true);
  };

  return (
    <div className="category" onMouseLeave={handleHideMenu}>
      <button
        className="category__btn"
        type="button"
        onMouseEnter={handleShowMenu}>
        {title}
        <img
          className={`${showMenu && "reverse__icon"}`}
          src={arrowDownThin}
          alt="DownArrow"
        />
      </button>
      <ul className={`category__menu ${showMenu && "category__menu--show"}`}>
        {brands.map((brand, index) => (
          <li key={`brand-${brand}-${index}`}>
            <a className="category__link" href="/">
              {brand}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Category;
