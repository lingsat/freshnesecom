import React, { ChangeEvent, FC, useEffect, useState } from "react";
import ReactSlider from "react-slider";
import { useDispatch, useSelector } from "react-redux";
import { changePrice, IProductsState } from "@products/productsSlice";
import { AppDispatch, RootState } from "@/store/store";
import { getValidPrice } from "@/utils/products.utils";
import { EPrice } from "@products/types/product";
import "./FilterPrice.scss";

const FilterPrice: FC = () => {
  const { minMaxPrice, filter } = useSelector<RootState, IProductsState>(
    (state) => state.products
  );
  const [priceValues, setPriceValues] = useState<number[]>(filter.price);
  const isPricesValid =
    priceValues[0] < minMaxPrice.min || priceValues[0] > priceValues[1];

  const dispatch = useDispatch<AppDispatch>();

  const handleChangeMin = (event: ChangeEvent<HTMLInputElement>) => {
    const newMinPrice = getValidPrice(event.target.value, priceValues[1]);
    setPriceValues((prevValues) => [newMinPrice, prevValues[1]]);
  };

  const handleChangeMax = (event: ChangeEvent<HTMLInputElement>) => {
    const newMaxPrice = getValidPrice(event.target.value, minMaxPrice.max);
    setPriceValues((prevValues) => [prevValues[0], newMaxPrice]);
  };

  const handleBlurMin = (event: ChangeEvent<HTMLInputElement>) => {
    if (+event.target.value < minMaxPrice.min) {
      setPriceValues((prevValues) => [minMaxPrice.min, prevValues[1]]);
    }
  };

  const handleBlurMax = (event: ChangeEvent<HTMLInputElement>) => {
    if (+event.target.value < priceValues[0]) {
      setPriceValues((prevValues) => [prevValues[0], minMaxPrice.max]);
    }
  };

  const handleSearchByPrice = () => {
    dispatch(changePrice(priceValues));
  };

  useEffect(() => {
    const debounceTimer = setTimeout(handleSearchByPrice, 500);
    return () => clearTimeout(debounceTimer);
  }, [priceValues]);

  useEffect(() => {
    setPriceValues(filter.price);
  }, [filter.price]);

  return (
    <>
      <ReactSlider
        className="price-slider"
        thumbClassName="price-slider__thumb"
        trackClassName="price-slider__track"
        value={priceValues}
        onChange={setPriceValues}
        min={minMaxPrice.min}
        max={minMaxPrice.max}
        pearling
        minDistance={EPrice.MIN_DISTANCE}
      />
      <form className="filter-price">
        <label className="filter-price__label">
          Min
          <input
            className={`filter-price__input ${
              priceValues[0] < minMaxPrice.min
                ? "filter-price__input--error"
                : ""
            }`}
            type="number"
            min={minMaxPrice.min}
            max={minMaxPrice.max}
            value={priceValues[0] || ""}
            onChange={handleChangeMin}
            onBlur={handleBlurMin}
          />
        </label>
        <label className="filter-price__label">
          Max
          <input
            className={`filter-price__input ${
              priceValues[0] > priceValues[1]
                ? "filter-price__input--error"
                : ""
            }`}
            type="number"
            min={priceValues[0]}
            max={minMaxPrice.max}
            value={priceValues[1] || ""}
            onChange={handleChangeMax}
            onBlur={handleBlurMax}
          />
        </label>
        {isPricesValid && (
          <p className="filter-price__error">
            {`The prices should be between ${minMaxPrice.min} and ${minMaxPrice.max} USD. Min can't be lower than Max`}
          </p>
        )}
      </form>
    </>
  );
};

export default FilterPrice;
