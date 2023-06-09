import React, { FC, PropsWithChildren } from "react";
import { ErrorMessage, Field } from "formik";

import "./Checkbox.scss";

interface CheckboxProps {
  name: string;
  required?: boolean;
}

const Checkbox: FC<PropsWithChildren<CheckboxProps>> = ({
  name,
  required = false,
  children,
}) => {
  return (
    <label className="checkbox" htmlFor={name}>
      <p
        className={`checkbox__label${
          required ? " checkbox__label--required" : ""
        }`}>
        {children}
      </p>
      <Field
        className="checkbox__field"
        type="checkbox"
        id={name}
        name={name}
      />
      <ErrorMessage component="span" className="checkbox__error" name={name} />
    </label>
  );
};

export default Checkbox;
