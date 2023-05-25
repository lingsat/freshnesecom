import React, { FC, useState } from "react";

import { getTabsData } from "@/utils/products";
import { IProduct } from "@Products/types/product";
import Description from "@ProductsComponents/Description/Description";
import Reviews from "@ProductsComponents/Reviews/Reviews";
import Questions from "@ProductsComponents/Questions/Questions";

import "./Tabs.scss";

enum ETabs {
  ZERO = 0,
  ONE = 1,
  TWO = 2,
}

interface TabsProps {
  product: IProduct;
}

const Tabs: FC<TabsProps> = ({ product }) => {
  const [value, setValue] = useState<ETabs>(ETabs.ZERO);

  const tabs = getTabsData(product);

  const handleActiveChange = (newValue: ETabs) => () => {
    setValue(newValue);
  };

  return (
    <div className="tabs">
      <ul className="tabs__header">
        {tabs.map((tab, index) => (
          <li
            key={`tab-${tab.title}-${index}`}
            className={`tabs__item${
              value === index ? " tabs__item--active" : ""
            }`}>
            <p className="tabs__title" onClick={handleActiveChange(index)}>
              {tab.title}
            </p>
            <span>{tab.length}</span>
          </li>
        ))}
      </ul>
      <div className="tabs__content">
        {!value && <Description description={product.description} />}
        {value === ETabs.ONE && <Reviews reviews={product.reviews} />}
        {value === ETabs.TWO && <Questions questions={product.questions} />}
      </div>
    </div>
  );
};

export default Tabs;
