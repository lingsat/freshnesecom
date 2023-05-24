import React, { ChangeEvent, FC, useState } from "react";

import { getCountCategories, getValidPrice } from "@/utils/products";
import { ECount, IProduct } from "@Products/types/product";
import DropDown from "@CommonComponents/DropDown/DropDown";

import arrowIcon from "@Images/arrow_black.svg";

import "./Count.scss";

interface CountProps {
  product: IProduct;
  countCategory: string;
  setCountCategory: React.Dispatch<React.SetStateAction<string>>;
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
  isCountInvalid: boolean;
}

const Count: FC<CountProps> = ({
  product,
  countCategory,
  setCountCategory,
  count,
  setCount,
  isCountInvalid,
}) => {
  const [maxError, setMaxError] = useState<boolean>(false);
  const [showMenu, setShowMenu] = useState<boolean>(false);

  const countCategoryList = getCountCategories(product.price);
  const maxCountValue = product.stock[countCategory];
  const isCountInvalidMax = isCountInvalid || maxError;

  const handleHideMenu = () => {
    setShowMenu(false);
  };

  const handleShowMenu = () => {
    setShowMenu(true);
  };

  const handleChangeCount = (event: ChangeEvent<HTMLInputElement>) => {
    if (+event.target.value > maxCountValue) {
      setMaxError(true);
    }
    const newValidCount = getValidPrice(event.target.value, maxCountValue);
    setCount(newValidCount);
  };

  const handleBlurCount = (event: ChangeEvent<HTMLInputElement>) => {
    if (+event.target.value < ECount.MIN_COUNT_VALUE) {
      setCount(ECount.MIN_COUNT_VALUE);
    }
    setMaxError(false);
  };

  const handleSetCountCategory = (newCountCategory: string) => {
    setCountCategory(newCountCategory);
    handleHideMenu();
  };

  return (
    <div
      className={`count${isCountInvalidMax ? " count--error" : ""}`}
      onMouseLeave={handleHideMenu}>
      <label className="count__label">
        <input
          type="number"
          value={count || ""}
          onChange={handleChangeCount}
          onBlur={handleBlurCount}
        />
      </label>
      {isCountInvalidMax && (
        <p className="count__message">{`Min ${ECount.MIN_COUNT_VALUE} / Max ${maxCountValue} ${countCategory}.`}</p>
      )}
      <div className="count__selector">
        <div className="count__btn" onMouseEnter={handleShowMenu}>
          {countCategory}
          <img
            className={`${showMenu ? "reverse__icon" : ""}`}
            src={arrowIcon}
            alt="DownArrow"
          />
        </div>
        {showMenu && (
          <DropDown
            size="small"
            list={countCategoryList}
            onClick={handleSetCountCategory}
          />
        )}
      </div>
    </div>
  );
};

export default Count;
