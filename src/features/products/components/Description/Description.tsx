import React, { FC } from "react";

import "./Description.scss";

const descriptionList = [
  {
    category: "Origins",
    text: "We work hard to ensure that the fruit and vegetables we sell are fresh and high in quality. If we don`t grow them ourselves, we source them from carefully chosen suppliers, preferring to buy locally whenever possible.",
  },
  {
    category: "How to cook",
    text: "From roasts, salads and soups to casseroles and cakes, Carrots will lend sweetness, texture and colour to an enormous number of recipes.",
  },
];

const Description: FC = () => {
  return (
    <ul className="description">
      {descriptionList.map((item, index) => (
        <li key={`description-${item.category}-${index}`}>
          <h4 className="description__subtitle">{item.category}</h4>
          <p className="description__text">{item.text}</p>
        </li>
      ))}
    </ul>
  );
};

export default Description;
