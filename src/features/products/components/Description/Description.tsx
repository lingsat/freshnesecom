import React, { FC } from "react";

import { IDescription } from "@Products/types/product";

import "./Description.scss";

interface DescriptionProps {
  description: IDescription[];
}

const Description: FC<DescriptionProps> = ({ description }) => {
  if (!description.length) {
    return (
      <p className="description__message">No description for this product!</p>
    );
  }

  return (
    <ul className="description">
      {description.map((item, index) => (
        <li key={`description-${item.category}-${index}`}>
          <h4 className="description__subtitle">{item.category}</h4>
          <p className="description__text">{item.text}</p>
        </li>
      ))}
    </ul>
  );
};

export default Description;
