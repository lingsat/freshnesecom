import React, { FC, useState } from "react";
import { Link } from "react-router-dom";
import arrowDownThin from "@/assets/images/arrow_down_thin.svg";
import { brands } from "@/mock/brands";
import "./Category.scss";

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
            <Link className="category__link" to="/">
              {brand}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Category;
