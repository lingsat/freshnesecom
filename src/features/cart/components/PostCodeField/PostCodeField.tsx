import React, { ChangeEvent, FC } from "react";
import { Field, ErrorMessage } from "formik";

import { ELocation } from "@Cart/types/location";

interface PostCodeFieldProps {
  setFieldValue: (name: string, value: string | undefined) => void;
}

const PostCodeField: FC<PostCodeFieldProps> = ({ setFieldValue }) => {
  const handlePostalCodeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numericValue = value.replace(/\D/g, "");
    setFieldValue(ELocation.POSTAL_CODE, numericValue);
  };

  return (
    <label className="billing__label" htmlFor={ELocation.POSTAL_CODE}>
      <p className="required">ZIP / Postal code</p>
      <Field
        className="billing__field"
        id={ELocation.POSTAL_CODE}
        name={ELocation.POSTAL_CODE}
        placeholder="Postal code or ZIP"
        onChange={handlePostalCodeChange}
      />
      <ErrorMessage
        name={ELocation.POSTAL_CODE}
        component="span"
        className="billing__error"
      />
    </label>
  );
};

export default PostCodeField;
