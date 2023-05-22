import React, { FC } from "react";

import { getStarsArrFromNumber } from "@/utils/products";

import star from "@Images/star.svg";
import checkedStar from "@Images/star_checked_gold.svg";

import "./FilterStars.scss";

interface FilterStarsProps {
  checkedStars: string;
}

const FilterStars: FC<FilterStarsProps> = ({ checkedStars }) => {
  const starsArr = getStarsArrFromNumber(+checkedStars);

  return (
    <ul className="filter-stars">
      {starsArr.map((item, index) => (
        <li
          key={`star-${checkedStars}-${index}`}
          className="filter-stars__item">
          <img src={item ? checkedStar : star} alt="Star" />
        </li>
      ))}
    </ul>
  );
};

export default FilterStars;
