import React, { FC, useState, SyntheticEvent } from "react";
import { ErrorMessage } from "formik";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Country, ICity, ICountry } from "country-state-city";

import { getCitiesByCountry } from "@/utils/cart";

import "./DropDownField.scss";

interface DropDownFieldProps {
  setFieldValue: (name: string, value: string | undefined) => void;
}

const DropDownField: FC<DropDownFieldProps> = ({ setFieldValue }) => {
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

  const styles = {
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

  return (
    <>
      <label className="dropdown-field" htmlFor="country">
        <p className="dropdown-field__label">State / Country</p>
        <Autocomplete
          options={countries}
          getOptionLabel={(option) => option.name}
          onChange={handleCountryChange}
          sx={styles}
          renderInput={(params) => (
            <TextField
              name="country"
              {...params}
              placeholder="Chose a state or Country"
              inputProps={{
                ...params.inputProps,
                autoComplete: "new-password",
              }}
            />
          )}
        />
        <ErrorMessage
          component="span"
          className="dropdown-field__error"
          name="country"
        />
      </label>
      <label className="dropdown-field" htmlFor="city">
        <p className="dropdown-field__label">Town / City</p>
        <Autocomplete
          options={cities}
          getOptionLabel={(option) => option.name}
          onChange={handleCityChange}
          sx={styles}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="Town or City"
              inputProps={{
                ...params.inputProps,
                autoComplete: "new-password",
              }}
            />
          )}
        />
        <ErrorMessage
          component="span"
          className="dropdown-field__error"
          name="city"
        />
      </label>
    </>
  );
};

export default DropDownField;
