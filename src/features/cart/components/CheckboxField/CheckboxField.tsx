import { ErrorMessage, Field } from "formik";
import React, { FC, PropsWithChildren } from "react";

import "./CheckboxField.scss";

interface CheckboxFieldProps {
  name: string;
}

const CheckboxField: FC<PropsWithChildren<CheckboxFieldProps>> = ({
  name,
  children,
}) => {
  return (
    <label className="checkbox" htmlFor={name}>
      <p className="checkbox__label">{children}</p>
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

export default CheckboxField;
