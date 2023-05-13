import React, { FC, useState } from "react";
import { Link } from "react-router-dom";
import arrowDownThin from "@/assets/images/arrow_down_thin.svg";
import "./Category.scss";

interface CategoryProps {
  title: string;
  brands: string[];
}

const Category: FC<CategoryProps> = ({ title, brands }) => {
  const [showMenu, setShowMenu] = useState<boolean>(false);

  const handleHideMenu = () => {
    setShowMenu(false);
  };

  const handleShowMenu = () => {
    setShowMenu(true);
  };

  return (
    <li className="category" onMouseLeave={handleHideMenu}>
      <div className="category__item" onMouseEnter={handleShowMenu}>
        {title}
        <img
          className={`${showMenu && "reverse__icon"}`}
          src={arrowDownThin}
          alt="DownArrow"
        />
      </div>
      <ul
        className={`category__menu ${showMenu ? "category__menu--show" : ""}`}>
        {brands.map((brand, index) => (
          <li key={`brand-${brand}-${index}`}>
            <Link className="category__link" to="/">
              {brand}
            </Link>
          </li>
        ))}
      </ul>
    </li>
  );
};

export default Category;
