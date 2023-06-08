import React, { FC } from "react";
import { ErrorMessage, Field } from "formik";

import "./Input.scss";

interface InputProps {
  name: string;
  label: string;
  placeholder: string;
  type?: string;
  required?: boolean;
}

const Input: FC<InputProps> = ({
  name,
  label,
  placeholder,
  type = "text",
  required = false,
}) => {
  return (
    <label className="input-field" htmlFor={name}>
      <p
        className={`input-field__label${
          required ? " input-field__label--required" : ""
        }`}>
        {label}
      </p>
      <Field
        className="input-field__field"
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        autoComplete="on"
      />
      <ErrorMessage
        component="span"
        className="input-field__error"
        name={name}
      />
    </label>
  );
};

export default Input;
