import React, { ChangeEvent, FC, useState } from "react";

import { getCountCategories, getValidNumber } from "@/utils/products";
import { IProduct } from "@Products/types/product";
import { ECount } from "@/common/types/count";
import DropDown from "@CommonComponents/DropDown/DropDown";

import arrowIcon from "@Images/arrow_black.svg";

import "./Count.scss";

interface CountProps {
  product: IProduct;
  countCategory: string;
  handleChangeCategory: (newCategory: string) => void;
  count: number;
  handleChangeAmount: (newCategory: number) => void;
  isCountInvalid: boolean;
  disabled?: boolean;
  maxCount: number;
}

const Count: FC<CountProps> = ({
  product,
  countCategory,
  handleChangeCategory,
  count,
  handleChangeAmount,
  isCountInvalid,
  disabled = false,
  maxCount,
}) => {
  const [error, setError] = useState<boolean>(false);
  const [showMenu, setShowMenu] = useState<boolean>(false);

  const countCategoryList = getCountCategories(product.price);
  const isCountInvalidMax = isCountInvalid || error;
  const isCountCategorySingle = countCategoryList.length === 1;

  const handleHideMenu = () => {
    setShowMenu(false);
  };

  const handleShowMenu = () => {
    setShowMenu(true);
  };

  const handleCountChange = (increment: number) => () => {
    const newCount = count + increment;
    const newValidCount = getValidNumber(newCount.toString(), maxCount);
    handleChangeAmount(newValidCount);
    setError(newCount > maxCount || newCount < ECount.MIN_COUNT_VALUE);
  };

  const handleChangeCount = (event: ChangeEvent<HTMLInputElement>) => {
    setError(+event.target.value > maxCount);
    const newValidCount = getValidNumber(event.target.value, maxCount);
    handleChangeAmount(newValidCount);
  };

  const handleBlurCount = (event: ChangeEvent<HTMLInputElement>) => {
    if (+event.target.value < ECount.MIN_COUNT_VALUE) {
      handleChangeAmount(ECount.MIN_COUNT_VALUE);
    }
    setError(false);
  };

  const handleSetCountCategory = (newCountCategory: string) => {
    handleChangeCategory(newCountCategory);
    handleHideMenu();
  };

  return (
    <div
      className={`count${isCountInvalidMax ? " count--error" : ""}${
        disabled ? " count--disabled" : ""
      }`}
      onMouseLeave={handleHideMenu}>
      <label className="count__label">
        <button
          className="count__changer count__changer--decrease"
          onClick={handleCountChange(ECount.DECREMENT_VALUE)}>
          -
        </button>
        <input
          type="number"
          value={count || ""}
          onChange={handleChangeCount}
          onBlur={handleBlurCount}
          disabled={disabled}
        />
        <button
          className="count__changer"
          onClick={handleCountChange(ECount.MIN_COUNT_VALUE)}>
          +
        </button>
      </label>
      {isCountInvalidMax && (
        <p className="count__message">{`Min ${ECount.MIN_COUNT_VALUE} / Left ${maxCount} ${countCategory}.`}</p>
      )}
      <div className="count__selector">
        {isCountCategorySingle ? (
          <div className="count__btn count__btn--single">{countCategory}</div>
        ) : (
          <div className="count__btn" onMouseEnter={handleShowMenu}>
            {countCategory}
            <img
              className={`${showMenu ? "reverse__icon" : ""}`}
              src={arrowIcon}
              alt="DownArrow"
            />
          </div>
        )}
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
