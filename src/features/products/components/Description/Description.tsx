import React, { FC } from "react";

import "./Description.scss";

const Description: FC = () => {
  return (
    <ul className="description">
      <li>
        <h4 className="description__subtitle">Origins</h4>
        <p className="description__text">
          We work hard to ensure that the fruit and vegetables we sell are fresh
          and high in quality. If we don’t grow them ourselves, we source them
          from carefully chosen suppliers, preferring to buy locally whenever
          possible.
        </p>
      </li>
      <li>
        <h4 className="description__subtitle">How to cook</h4>
        <p className="description__text">
          From roasts, salads and soups to casseroles and cakes, Carrots will
          lend sweetness, texture and colour to an enormous number of recipes.
        </p>
      </li>
    </ul>
  );
};

export default Description;
