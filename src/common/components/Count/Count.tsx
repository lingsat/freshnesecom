import React, { ChangeEvent, FC, useState } from "react";
import { toast } from "react-toastify";

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
  disabled?: boolean;
  invalidCategories?: string[];
  maxCount: number;
}

const Count: FC<CountProps> = ({
  product,
  countCategory,
  setCountCategory,
  count,
  setCount,
  isCountInvalid,
  disabled = false,
  invalidCategories = [],
  maxCount,
}) => {
  const [maxError, setMaxError] = useState<boolean>(false);
  const [showMenu, setShowMenu] = useState<boolean>(false);

  const countCategoryList = getCountCategories(product.price);
  const isCountInvalidMax = isCountInvalid || maxError;
  const isCountCategorySingle = countCategoryList.length === 1;

  const handleHideMenu = () => {
    setShowMenu(false);
  };

  const handleShowMenu = () => {
    setShowMenu(true);
  };

  const increaseCount = () => {
    setCount((prev) => {
      if (prev >= maxCount) {
        setMaxError(true);
        return prev;
      } else {
        setMaxError(false);
        return prev + 1;
      }
    });
  };

  const decreaseCount = () => {
    setCount((prev) => {
      if (prev <= 0) {
        setMaxError(true);
        return prev;
      } else {
        setMaxError(false);
        return prev - 1;
      }
    });
  };

  const handleChangeCount = (event: ChangeEvent<HTMLInputElement>) => {
    if (+event.target.value > maxCount) {
      setMaxError(true);
    } else {
      setMaxError(false);
    }
    const newValidCount = getValidPrice(event.target.value, maxCount);
    setCount(newValidCount);
  };

  const handleBlurCount = (event: ChangeEvent<HTMLInputElement>) => {
    if (+event.target.value < ECount.MIN_COUNT_VALUE) {
      setCount(ECount.MIN_COUNT_VALUE);
    }
    setMaxError(false);
  };

  const notifyInvalidCategory = (category: string) =>
    toast.warn(`Such product with "${category}" units already exist in cart!`);

  const handleSetCountCategory = (newCountCategory: string) => {
    if (invalidCategories.includes(newCountCategory)) {
      notifyInvalidCategory(newCountCategory);
    } else {
      setCountCategory(newCountCategory);
      setCount(ECount.MIN_COUNT_VALUE);
    }

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
          onClick={decreaseCount}>
          -
        </button>
        <input
          type="number"
          value={count || ""}
          onChange={handleChangeCount}
          onBlur={handleBlurCount}
          disabled={disabled}
        />
        <button className="count__changer" onClick={increaseCount}>
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
