import React, { FC } from "react";
import { ErrorMessage } from "formik";
import PhoneInput from "react-phone-number-input";

import { EBilling } from "@/features/cart/types/billing";

interface PhoneFieldProps {
  setFieldValue: (name: string, value: string | undefined) => void;
  phoneValue: string;
  handleBlur: (e: React.FocusEvent<HTMLInputElement, Element>) => void;
}

const PhoneField: FC<PhoneFieldProps> = ({
  setFieldValue,
  phoneValue,
  handleBlur,
}) => {
  const handlePhoneChange = (value: string | undefined) => {
    setFieldValue(EBilling.PHONE_NUMBER, value);
  };

  return (
    <label className="billing__label" htmlFor={EBilling.PHONE_NUMBER}>
      <p className="required">Phone number</p>
      <PhoneInput
        country="US"
        name={EBilling.PHONE_NUMBER}
        placeholder="Phone number"
        value={phoneValue}
        onChange={handlePhoneChange}
        onBlur={handleBlur}
      />
      <ErrorMessage
        name={EBilling.PHONE_NUMBER}
        component="span"
        className="billing__error"
      />
    </label>
  );
};

export default PhoneField;
