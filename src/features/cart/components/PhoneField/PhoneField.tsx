import React, { FC } from "react";
import { ErrorMessage } from "formik";
import PhoneInput from "react-phone-number-input";

import { ELocation } from "@Cart/types/location";

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
    setFieldValue(ELocation.PHONE_NUMBER, value);
  };

  return (
    <label className="billing__label" htmlFor={ELocation.PHONE_NUMBER}>
      <p className="required">Phone number</p>
      <PhoneInput
        country="US"
        name={ELocation.PHONE_NUMBER}
        placeholder="Phone number"
        value={phoneValue}
        onChange={handlePhoneChange}
        onBlur={handleBlur}
      />
      <ErrorMessage
        name={ELocation.PHONE_NUMBER}
        component="span"
        className="billing__error"
      />
    </label>
  );
};

export default PhoneField;
