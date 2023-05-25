import React, { FC, useState } from "react";

import Description from "@ProductsComponents/Description/Description";
import Reviews from "@ProductsComponents/Reviews/Reviews";
import Questions from "@ProductsComponents/Questions/Questions";

import "./Tabs.scss";

// interface TabsProps {}

const Tabs: FC = () => {
  const [value, setValue] = useState<number>(0);

  const tabsArr = ["Description", "Reviews", "Questions"];

  const handleActiveChange = (newValue: number) => () => {
    setValue(newValue);
  };

  return (
    <div className="tabs">
      <ul className="tabs__header">
        {tabsArr.map((tabName, index) => (
          <li
            key={`tab-${tabName}-${index}`}
            className={`tabs__item${
              value === index ? " tabs__item--active" : ""
            }`}>
            <p className="tabs__title" onClick={handleActiveChange(index)}>
              {tabName}
            </p>
            <span>18</span>
          </li>
        ))}
      </ul>
      {/* <Description /> */}
      {/* <Reviews /> */}
      <Questions />
    </div>
  );
};

export default Tabs;
