import React, { ChangeEvent, FC, useEffect, useState } from "react";
import ReactSlider from "react-slider";
import { useDispatch } from "react-redux";
import { changePrice } from "@products/productsSlice";
import { AppDispatch } from "@/store/store";
import { getValidPrice } from "@/utils/products.utils";
import { EPrice } from "@products/types/price.enum";
import "./FilterPrice.scss";

interface FilterPriceProps {
  priceMinMax: { min: number; max: number };
}

const FilterPrice: FC<FilterPriceProps> = ({ priceMinMax }) => {
  const [priceValues, setPriceValues] = useState<number[]>([
    priceMinMax.min,
    priceMinMax.max,
  ]);

  const dispatch = useDispatch<AppDispatch>();

  const handleChangeMin = (event: ChangeEvent<HTMLInputElement>) => {
    const newMinPrice = getValidPrice(event.target.value, priceValues[1]);
    setPriceValues((prevValues) => [newMinPrice, prevValues[1]]);
  };

  const handleChangeMax = (event: ChangeEvent<HTMLInputElement>) => {
    const newMaxPrice = getValidPrice(event.target.value, priceMinMax.max);
    setPriceValues((prevValues) => [prevValues[0], newMaxPrice]);
  };

  const handleBlurMin = (event: ChangeEvent<HTMLInputElement>) => {
    if (+event.target.value < priceMinMax.min) {
      setPriceValues((prevValues) => [priceMinMax.min, prevValues[1]]);
    }
  };

  const handleBlurMax = (event: ChangeEvent<HTMLInputElement>) => {
    if (+event.target.value < priceValues[0]) {
      setPriceValues((prevValues) => [prevValues[0], priceMinMax.max]);
    }
  };

  const handleSearchByPrice = () => {
    dispatch(changePrice(priceValues));
  };

  useEffect(() => {
    handleSearchByPrice();
  }, [priceValues]);

  return (
    <>
      <ReactSlider
        className="price-slider"
        thumbClassName="price-slider__thumb"
        trackClassName="price-slider__track"
        value={priceValues}
        onChange={setPriceValues}
        min={priceMinMax.min}
        max={priceMinMax.max}
        pearling
        minDistance={EPrice.MIN_DISTANCE}
      />
      <form className="filter-price">
        <label className="filter-price__label">
          Min
          <input
            className={`filter-price__input ${
              priceValues[0] < priceMinMax.min
                ? "filter-price__input--error"
                : ""
            }`}
            type="number"
            min={priceMinMax.min}
            max={priceMinMax.max}
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
            max={priceMinMax.max}
            value={priceValues[1] || ""}
            onChange={handleChangeMax}
            onBlur={handleBlurMax}
          />
        </label>
      </form>
    </>
  );
};

export default FilterPrice;
