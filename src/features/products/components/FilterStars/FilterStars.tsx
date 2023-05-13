import React, { FC } from "react";
import { getStarsArrFromNumber } from "@/utils/products.utils";
import checkedStar from "@/assets/images/star_checked_gold.svg";
import star from "@/assets/images/star.svg";
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
