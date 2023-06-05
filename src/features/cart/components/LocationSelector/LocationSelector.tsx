import React, { FC, useEffect, useRef, useState } from "react";
import { ICity, ICountry } from "country-state-city";
import { ErrorMessage, Field } from "formik";

import { getCitiesByCountry, getFilteredCountries } from "@Cart/utils/cart";
import { EBilling } from "@Cart/types/billing";

import arrowDown from "@Images/arrow_black.svg";
import clear from "@Images/close.svg";

import "./LocationSelector.scss";

interface LocationSelectorProps {
  allCountries: ICountry[];
  setFieldValue: (name: string, value: string | undefined) => void;
  countryValue: string;
  cityValue: string;
  countryCode: string;
  setCountryCode: React.Dispatch<React.SetStateAction<string>>;
}

const LocationSelector: FC<LocationSelectorProps> = ({
  allCountries,
  setFieldValue,
  countryValue,
  cityValue,
  countryCode,
  setCountryCode,
}) => {
  const [showCountries, setShowCountries] = useState<boolean>(false);
  const [showCities, setShowCities] = useState<boolean>(false);

  const countriesRef = useRef<HTMLDivElement>(null);
  const citiesRef = useRef<HTMLDivElement>(null);

  const countries = getFilteredCountries(allCountries, countryValue);
  const cities = getCitiesByCountry(countryCode, cityValue);

  const handleCountryChose = (country: ICountry) => () => {
    setFieldValue(EBilling.COUNTRY, country.name);
    setCountryCode(country.isoCode);
    setShowCountries(false);
  };

  const handleCityChose = (city: ICity) => () => {
    setFieldValue(EBilling.CITY, city.name);
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
    setFieldValue(EBilling.COUNTRY, "");
    setFieldValue(EBilling.CITY, "");
    setCountryCode("");
  };

  const handleClearCity = () => {
    setFieldValue(EBilling.CITY, "");
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
      <div ref={countriesRef} className="dropdown-field__wrapper">
        <label className="dropdown-field" htmlFor={EBilling.COUNTRY}>
          <p className="dropdown-field__label">State / Country</p>
          <Field
            className="dropdown-field__field"
            id={EBilling.COUNTRY}
            name={EBilling.COUNTRY}
            placeholder="Choose a state or Country"
            onFocus={handleCountryFocus}
            autoComplete="new-password"
          />
          <ErrorMessage
            component="span"
            className="dropdown-field__error"
            name={EBilling.COUNTRY}
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
        )}
      </div>
      <div ref={citiesRef} className="dropdown-field__wrapper">
        <label className="dropdown-field" htmlFor={EBilling.CITY}>
          <p className="dropdown-field__label">Town / City</p>
          <Field
            className="dropdown-field__field"
            id={EBilling.CITY}
            name={EBilling.CITY}
            placeholder="Town or city"
            onFocus={handleCityFocus}
            autoComplete="new-password"
            disabled={!countryValue}
          />
          <ErrorMessage
            component="span"
            className="dropdown-field__error"
            name={EBilling.CITY}
          />
          {cityValue && (
            <img
              className="dropdown-field__clear"
              src={clear}
              alt="Down"
              onClick={handleClearCity}
            />
          )}
          {!!cities.length && (
            <img className="dropdown-field__arrow" src={arrowDown} alt="Down" />
          )}
        </label>
        {showCities && !!cities.length && (
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
        )}
      </div>
    </>
  );
};

export default LocationSelector;
