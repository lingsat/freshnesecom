import React, { FC, useState, SyntheticEvent } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { Country, ICity, ICountry } from "country-state-city";
import { FormikErrors, FormikTouched } from "formik";

import { getCitiesByCountry } from "@/utils/cart";
import { ELocation } from "@Cart/types/location";

import "./LocationSelector.scss";

interface LocationSelectorProps {
  setFieldValue: (name: string, value: string | undefined) => void;
  handleBlur: (e: React.FocusEvent<HTMLInputElement, Element>) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errors: FormikErrors<{ [field: string]: string }>;
  touched: FormikTouched<{ [field: string]: string }>;
  values: { [field: string]: string | boolean };
}

const LocationSelector: FC<LocationSelectorProps> = ({
  setFieldValue,
  handleBlur,
  handleChange,
  errors,
  touched,
  values,
}) => {
  const [countryCode, setCountryCode] = useState<string>("");

  const countries = Country.getAllCountries();
  const cities = getCitiesByCountry(countryCode);

  const handleCountryChange = (
    e: SyntheticEvent<Element, Event>,
    value: ICountry | null
  ) => {
    setFieldValue(ELocation.COUNTRY, value?.name);
    setCountryCode(value?.isoCode || "");
  };

  const handleCityChange = (
    e: SyntheticEvent<Element, Event>,
    value: ICity | null
  ) => {
    setFieldValue(ELocation.CITY, value?.name || "");
  };

  const autocompleteStyles = {
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "#d2d2d4",
    },
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      border: "1px solid #d2d2d4",
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      border: "1px solid #6a983c",
    },
    "& .MuiAutocomplete-inputRoot": {
      padding: "0.75rem 2rem 0.75rem 1rem",
      borderRadius: "12px",
      background: "#f9f9f9",
      "& .MuiAutocomplete-input": {
        padding: "0",
        fontFamily: "Open Sans",
        fontSize: "0.875rem",
        fontWeight: "400",
        lineHeight: "1.185rem",
        color: "#a9a9a9",
        backgroundColor: "transparent",
      },
    },
    "& .Mui-disabled": {
      backgroundColor: "#a9a9a9",
      opacity: "0.6",
    },
  };

  const textFieldStyles = {
    input: {
      "&::placeholder": {
        color: "#a9a9a9",
        opacity: 1,
      },
    },
  };

  return (
    <>
      <label className="dropdown-field" htmlFor={ELocation.COUNTRY}>
        <p className="dropdown-field__label">State / Country</p>
        <Autocomplete
          options={countries}
          getOptionLabel={(option) => option.name}
          onChange={handleCountryChange}
          onBlur={handleBlur}
          inputValue={values[ELocation.COUNTRY] as string}
          sx={autocompleteStyles}
          renderInput={(params) => (
            <TextField
              name={ELocation.COUNTRY}
              sx={textFieldStyles}
              {...params}
              placeholder="Choose a state or Country"
              inputProps={{
                ...params.inputProps,
                autoComplete: "new-password",
              }}
              value={values[ELocation.COUNTRY]}
              onChange={handleChange}
            />
          )}
        />
        {errors[ELocation.COUNTRY] && touched[ELocation.COUNTRY] && (
          <p className="dropdown-field__error">{errors[ELocation.COUNTRY]}</p>
        )}
      </label>
      <label className="dropdown-field" htmlFor={ELocation.CITY}>
        <p className="dropdown-field__label">Town / City</p>
        <Autocomplete
          options={cities}
          getOptionLabel={(option) => option.name}
          onChange={handleCityChange}
          onBlur={handleBlur}
          inputValue={values[ELocation.CITY] as string}
          disabled={!values[ELocation.COUNTRY]}
          sx={autocompleteStyles}
          renderOption={(props, option) => {
            return (
              <li {...props} key={`city-${option.name}-${option.latitude}`}>
                {option.name}
              </li>
            );
          }}
          renderInput={(params) => (
            <TextField
              name={ELocation.CITY}
              sx={textFieldStyles}
              {...params}
              placeholder="Town or city"
              inputProps={{
                ...params.inputProps,
                autoComplete: "new-password",
              }}
              value={values[ELocation.CITY]}
              onChange={handleChange}
            />
          )}
        />
        {errors[ELocation.CITY] && touched[ELocation.CITY] && (
          <p className="dropdown-field__error">{errors[ELocation.CITY]}</p>
        )}
      </label>
    </>
  );
};

export default LocationSelector;
