import React, { FC } from "react";

import { getStarsArrFromNumber } from "@/utils/products";
import { EStarsColor } from "@/common/types/stars";

import star from "@Images/star.svg";
import goldStar from "@Images/star_checked_gold.svg";
import blackStar from "@Images/star_checked.svg";

import "./Stars.scss";

interface StarsProps {
  checkedStars: string;
  starColor?: EStarsColor;
}

const Stars: FC<StarsProps> = ({
  checkedStars,
  starColor = EStarsColor.GOLD,
}) => {
  const starsArr = getStarsArrFromNumber(+checkedStars);
  const imageRes = { goldStar, blackStar }[starColor];

  return (
    <ul className="stars">
      {starsArr.map((item, index) => (
        <li key={`star-${checkedStars}-${index}`} className="stars__item">
          <img
            className={`stars__image${
              starColor === EStarsColor.BLACK ? " stars__image--black" : ""
            }`}
            src={item ? imageRes : star}
            alt="Star"
          />
        </li>
      ))}
    </ul>
  );
};

export default Stars;
