import React, { ChangeEvent, FC } from "react";
import { Field, ErrorMessage } from "formik";

import { EBilling } from "@/features/cart/types/billing";

interface PostCodeFieldProps {
  setFieldValue: (name: string, value: string | undefined) => void;
}

const PostCodeField: FC<PostCodeFieldProps> = ({ setFieldValue }) => {
  const handlePostalCodeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numericValue = value.replace(/\D/g, "");
    setFieldValue(EBilling.POSTAL_CODE, numericValue);
  };

  return (
    <label className="billing__label" htmlFor={EBilling.POSTAL_CODE}>
      <p className="required">ZIP / Postal code</p>
      <Field
        className="billing__field"
        id={EBilling.POSTAL_CODE}
        name={EBilling.POSTAL_CODE}
        placeholder="Postal code or ZIP"
        onChange={handlePostalCodeChange}
      />
      <ErrorMessage
        name={EBilling.POSTAL_CODE}
        component="span"
        className="billing__error"
      />
    </label>
  );
};

export default PostCodeField;
