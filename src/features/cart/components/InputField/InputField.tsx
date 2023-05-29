import { ErrorMessage, Field } from "formik";
import React, { FC } from "react";

import "./InputField.scss";

interface InputFieldProps {
  name: string;
  label: string;
  placeholder: string;
  type?: string;
}

const InputField: FC<InputFieldProps> = ({
  name,
  label,
  placeholder,
  type = "text",
}) => {
  return (
    <label className="input-field" htmlFor={name}>
      <p className="input-field__label">{label}</p>
      <Field
        className="input-field__field"
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
      />
      <ErrorMessage
        component="span"
        className="input-field__error"
        name={name}
      />
    </label>
  );
};

export default InputField;
