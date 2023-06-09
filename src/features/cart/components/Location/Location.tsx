import React, { FC, useEffect, useRef, useState } from "react";
import { ErrorMessage, Field } from "formik";

import { getFilteredCities, getFilteredCountries } from "@Cart/utils/location";
import { EBilling } from "@Cart/types/billing";
import { ICountry } from "@Cart/types/location";

import arrowDown from "@Images/arrow_black.svg";
import clear from "@Images/close.svg";

import "./Location.scss";

interface LocationProps {
  allCountries: ICountry[];
  setFieldValue: (name: string, value: string | undefined) => void;
  countryValue: string;
  cityValue: string;
  countryCode: string;
  setCountryCode: React.Dispatch<React.SetStateAction<string>>;
}

const Location: FC<LocationProps> = ({
  allCountries,
  setFieldValue,
  countryValue,
  cityValue,
  countryCode,
  setCountryCode,
}) => {
  const countriesRef = useRef<HTMLDivElement>(null);
  const citiesRef = useRef<HTMLDivElement>(null);

  const [showCountries, setShowCountries] = useState<boolean>(false);
  const [showCities, setShowCities] = useState<boolean>(false);

  const filteredCountries = getFilteredCountries(allCountries, countryValue);
  const filteredCities = getFilteredCities(
    allCountries,
    cityValue,
    countryCode
  );

  const handleCountryChose = (country: ICountry) => () => {
    setFieldValue(EBilling.COUNTRY, country.country);
    setCountryCode(country.iso2);
    setShowCountries(false);
  };

  const handleCityChose = (city: string) => () => {
    setFieldValue(EBilling.CITY, city);
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
      <div ref={countriesRef} className="location__wrapper">
        <label className="location" htmlFor={EBilling.COUNTRY}>
          <p className="location__label">State / Country</p>
          <Field
            className="location__field"
            id={EBilling.COUNTRY}
            name={EBilling.COUNTRY}
            placeholder="Choose a state or Country"
            onFocus={handleCountryFocus}
            autoComplete="new-password"
          />
          <ErrorMessage
            component="span"
            className="location__error"
            name={EBilling.COUNTRY}
          />
          {countryValue && (
            <img
              className="location__clear"
              src={clear}
              alt="Down"
              onClick={handleClearCountry}
            />
          )}
          <img className="location__arrow" src={arrowDown} alt="Down" />
        </label>
        {showCountries && !!filteredCountries.length && (
          <ul className="location__list">
            {filteredCountries.map((country, index) => (
              <li
                key={`country-${country.country}-${index}`}
                className="location__item"
                onClick={handleCountryChose(country)}>
                {country.country}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div ref={citiesRef} className="location__wrapper">
        <label className="location" htmlFor={EBilling.CITY}>
          <p className="location__label">Town / City</p>
          <Field
            className="location__field"
            id={EBilling.CITY}
            name={EBilling.CITY}
            placeholder="Town or city"
            onFocus={handleCityFocus}
            autoComplete="new-password"
            disabled={!countryValue}
          />
          <ErrorMessage
            component="span"
            className="location__error"
            name={EBilling.CITY}
          />
          {cityValue && (
            <img
              className="location__clear"
              src={clear}
              alt="Down"
              onClick={handleClearCity}
            />
          )}
          {!!filteredCities.length && (
            <img className="location__arrow" src={arrowDown} alt="Down" />
          )}
        </label>
        {showCities && !!filteredCities.length && (
          <ul className="location__list">
            {filteredCities.map((city, index) => (
              <li
                key={`country-${city}-${index}`}
                className="location__item"
                onClick={handleCityChose(city)}>
                {city}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default Location;
