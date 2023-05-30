import React, { FC, useEffect, useRef, useState } from "react";
import { ICity, ICountry } from "country-state-city";
import { ErrorMessage, Field } from "formik";

import { getCitiesByCountry, getCountries } from "@/utils/cart";
import { ELocation } from "@Cart/types/location";

import arrowDown from "@Images/arrow_black.svg";
import clear from "@Images/close.svg";

import "./LocationSelector.scss";

interface LocationSelectorProps {
  setFieldValue: (name: string, value: string | undefined) => void;
  countryValue: string;
  cityValue: string;
  countryCode: string;
  setCountryCode: React.Dispatch<React.SetStateAction<string>>;
  handleBlur: (e: React.FocusEvent<HTMLInputElement, Element>) => void;
}

const LocationSelector: FC<LocationSelectorProps> = ({
  setFieldValue,
  countryValue,
  cityValue,
  countryCode,
  setCountryCode,
  handleBlur,
}) => {
  const [showCountries, setShowCountries] = useState<boolean>(false);
  const [showCities, setShowCities] = useState<boolean>(false);

  const countriesRef = useRef<HTMLDivElement>(null);
  const citiesRef = useRef<HTMLDivElement>(null);

  const countries = getCountries(countryValue);
  const cities = getCitiesByCountry(countryCode, cityValue);

  const handleCountryChose = (country: ICountry) => () => {
    setFieldValue(ELocation.COUNTRY, country.name);
    setCountryCode(country.isoCode);
    setShowCountries(false);
  };

  const handleCityChose = (city: ICity) => () => {
    setFieldValue(ELocation.CITY, city.name);
    setShowCities(false);
  };

  const handleCountryFocus = () => {
    setShowCountries(true);
    setShowCities(false);
  };

  const handleCityFocus = () => {
    setShowCities(true);
    setShowCountries(false);
  };

  const handleClearCountry = () => {
    setFieldValue(ELocation.COUNTRY, "");
    setFieldValue(ELocation.CITY, "");
    setCountryCode("");
  };

  const handleClearCity = () => {
    setFieldValue(ELocation.CITY, "");
  };

  const handleCountryBlur = (
    event: React.FocusEvent<HTMLInputElement, Element>
  ) => {
    const isCountryInArray = countries.find(
      (country) => country.name === countryValue
    );

    if (!isCountryInArray) {
      handleClearCountry();
    }
    handleBlur(event);
  };

  const handleOutsideClick = (e: MouseEvent) => {
    if (
      countriesRef.current &&
      !countriesRef.current.contains(e.target as Node)
    ) {
      setShowCountries(false);
    }
    if (citiesRef.current && !citiesRef.current.contains(e.target as Node)) {
      setShowCities(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <>
      <div className="dropdown-field__wrapper">
        <label className="dropdown-field" htmlFor={ELocation.COUNTRY}>
          <p className="dropdown-field__label">State / Country</p>
          <Field
            className="dropdown-field__field"
            id={ELocation.COUNTRY}
            name={ELocation.COUNTRY}
            placeholder="Choose a state or Country"
            onFocus={handleCountryFocus}
            onBlur={handleCountryBlur}
            autoComplete="new-password"
          />
          <ErrorMessage
            component="span"
            className="dropdown-field__error"
            name={ELocation.COUNTRY}
          />
          {countryValue && (
            <img
              className="dropdown-field__clear"
              src={clear}
              alt="Down"
              onClick={handleClearCountry}
            />
          )}
          <img className="dropdown-field__arrow" src={arrowDown} alt="Down" />
        </label>
        {showCountries && !!countries.length && (
          <div ref={countriesRef} className="dropdown-field__dropdown">
            <ul className="dropdown-field__list">
              {countries.map((country, index) => (
                <li
                  key={`country-${country.name}-${index}`}
                  className="dropdown-field__item"
                  onClick={handleCountryChose(country)}>
                  {country.name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="dropdown-field__wrapper">
        <label className="dropdown-field" htmlFor={ELocation.CITY}>
          <p className="dropdown-field__label">Town / City</p>
          <Field
            className="dropdown-field__field"
            id={ELocation.CITY}
            name={ELocation.CITY}
            placeholder="Town or city"
            onFocus={handleCityFocus}
            autoComplete="new-password"
          />
          <ErrorMessage
            component="span"
            className="dropdown-field__error"
            name={ELocation.CITY}
          />
          {cityValue && (
            <img
              className="dropdown-field__clear"
              src={clear}
              alt="Down"
              onClick={handleClearCity}
            />
          )}
          <img className="dropdown-field__arrow" src={arrowDown} alt="Down" />
        </label>
        {showCities && !!cities.length && (
          <div ref={citiesRef} className="dropdown-field__dropdown">
            <ul className="dropdown-field__list">
              {cities.map((city, index) => (
                <li
                  key={`country-${city.name}-${index}`}
                  className="dropdown-field__item"
                  onClick={handleCityChose(city)}>
                  {city.name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default LocationSelector;
