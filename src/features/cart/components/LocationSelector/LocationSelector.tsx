import React, { FC, useState, SyntheticEvent } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { Country, ICity, ICountry } from "country-state-city";

import { getCitiesByCountry } from "@/utils/cart";

import "./LocationSelector.scss";

interface LocationSelectorProps {
  setFieldValue: (name: string, value: string | undefined) => void;
  countryError: string | undefined;
  cityError: string | undefined;
}

const LocationSelector: FC<LocationSelectorProps> = ({
  setFieldValue,
  countryError,
  cityError,
}) => {
  const [countryCode, setCountryCode] = useState<string>("");

  const countries = Country.getAllCountries();

  const cities = getCitiesByCountry(countryCode);

  const handleCountryChange = (
    e: SyntheticEvent<Element, Event>,
    value: ICountry | null
  ) => {
    setFieldValue("country", value?.name);
    setCountryCode(value?.isoCode || "");
  };

  const handleCityChange = (
    e: SyntheticEvent<Element, Event>,
    value: ICity | null
  ) => {
    setFieldValue("city", value?.name || "");
  };

  const autocompleteStyles = {
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "#d2d2d4",
    },
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      border: "1px solid #d2d2d4",
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
      <label className="dropdown-field" htmlFor="country">
        <p className="dropdown-field__label">State / Country</p>
        <Autocomplete
          options={countries}
          getOptionLabel={(option) => option.name}
          onChange={handleCountryChange}
          sx={autocompleteStyles}
          renderInput={(params) => (
            <TextField
              name="country"
              sx={textFieldStyles}
              {...params}
              placeholder="Choose a state or Country"
              inputProps={{
                ...params.inputProps,
                autoComplete: "new-password",
              }}
            />
          )}
        />
        {countryError && (
          <p className="dropdown-field__error">{countryError}</p>
        )}
      </label>
      <label className="dropdown-field" htmlFor="city">
        <p className="dropdown-field__label">Town / City</p>
        <Autocomplete
          options={cities}
          getOptionLabel={(option) => option.name}
          onChange={handleCityChange}
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
              name="city"
              sx={textFieldStyles}
              {...params}
              placeholder="Town or city"
              inputProps={{
                ...params.inputProps,
                autoComplete: "new-password",
              }}
            />
          )}
        />
        {cityError && <p className="dropdown-field__error">{cityError}</p>}
      </label>
    </>
  );
};

export default LocationSelector;
