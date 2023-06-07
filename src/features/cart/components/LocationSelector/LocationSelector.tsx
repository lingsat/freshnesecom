import React, { FC, useEffect, useRef, useState } from "react";
import { ErrorMessage, Field } from "formik";

import { getCities, getFilteredLocations } from "@Cart/utils/location";
import { EBilling } from "@Cart/types/billing";
import { ICity, ICountry } from "@Cart/types/location";
import { LOCAL_STORAGE_COUNTRY } from "@/constants";

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
  const countriesRef = useRef<HTMLDivElement>(null);
  const citiesRef = useRef<HTMLDivElement>(null);

  const [showCountries, setShowCountries] = useState<boolean>(false);
  const [showCities, setShowCities] = useState<boolean>(false);
  const [cities, setCities] = useState<ICity[]>([]);

  const filteredCountries = getFilteredLocations(allCountries, countryValue);
  const filteredCities = getFilteredLocations(cities, cityValue);

  const handleCountryChose = (option: ICountry) => () => {
    setFieldValue(EBilling.COUNTRY, option.label);
    setCountryCode(option.value);
    setShowCountries(false);
  };

  const handleCityChose = (city: ICity) => () => {
    setFieldValue(EBilling.CITY, city.label);
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

  const fetchCities = async () => {
    const data = await getCities(countryCode);
    setCities(data);
  };

  useEffect(() => {
    fetchCities();
    localStorage.setItem(LOCAL_STORAGE_COUNTRY, countryCode);
  }, [countryCode]);

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
        {showCountries && !!filteredCountries.length && (
          <ul className="dropdown-field__list">
            {filteredCountries.map((country, index) => (
              <li
                key={`country-${country.value}-${index}`}
                className="dropdown-field__item"
                onClick={handleCountryChose(country)}>
                {country.label}
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
          {!!filteredCities.length && (
            <img className="dropdown-field__arrow" src={arrowDown} alt="Down" />
          )}
        </label>
        {showCities && !!filteredCities.length && (
          <ul className="dropdown-field__list">
            {filteredCities.map((city, index) => (
              <li
                key={`country-${city.label}-${index}`}
                className="dropdown-field__item"
                onClick={handleCityChose(city)}>
                {city.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default LocationSelector;
