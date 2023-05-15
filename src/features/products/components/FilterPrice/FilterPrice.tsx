import React, { ChangeEvent, FC, useState } from "react";
import ReactSlider from "react-slider";
import { getValidPrice } from "@/utils/products.utils";
import { EPrice } from "@products/types/price.enum";
import "./FilterPrice.scss";

interface FilterPriceProps {
  maxPrice: number;
}

const FilterPrice: FC<FilterPriceProps> = ({ maxPrice }) => {
  const [priceValues, setPriceValues] = useState<number[]>([
    EPrice.MIN,
    maxPrice,
  ]);

  const handleChangeMin = (event: ChangeEvent<HTMLInputElement>) => {
    const newMinPrice = getValidPrice(event.target.value, priceValues[1]);
    setPriceValues((prevValues) => [newMinPrice, prevValues[1]]);
  };

  const handleChangeMax = (event: ChangeEvent<HTMLInputElement>) => {
    const newMaxPrice = getValidPrice(event.target.value, maxPrice);
    setPriceValues((prevValues) => [prevValues[0], newMaxPrice]);
  };

  const handleBlurMin = (event: ChangeEvent<HTMLInputElement>) => {
    if (+event.target.value < EPrice.MIN) {
      setPriceValues((prevValues) => [EPrice.MIN, prevValues[1]]);
    }
  };

  const handleBlurMax = (event: ChangeEvent<HTMLInputElement>) => {
    if (+event.target.value < priceValues[0]) {
      setPriceValues((prevValues) => [prevValues[0], maxPrice]);
    }
  };

  return (
    <>
      <ReactSlider
        className="price-slider"
        thumbClassName="price-slider__thumb"
        trackClassName="price-slider__track"
        value={priceValues}
        onChange={setPriceValues}
        min={EPrice.MIN}
        max={maxPrice}
        pearling
        minDistance={EPrice.MIN_DISTANCE}
      />
      <form className="filter-price">
        <label className="filter-price__label">
          Min
          <input
            className="filter-price__input"
            type="number"
            min={EPrice.MIN}
            max={maxPrice}
            value={priceValues[0] || ""}
            onChange={handleChangeMin}
            onBlur={handleBlurMin}
          />
        </label>
        <label className="filter-price__label">
          Max
          <input
            className="filter-price__input"
            type="number"
            min={priceValues[0]}
            max={maxPrice}
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
