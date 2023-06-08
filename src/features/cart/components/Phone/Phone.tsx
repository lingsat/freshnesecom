import React, { FC } from "react";
import { ErrorMessage } from "formik";
import PhoneInput from "react-phone-input-2";

import { EBilling } from "@Cart/types/billing";

import "./Phone.scss";

interface PhoneProps {
  setFieldValue: (name: string, value: string | undefined) => void;
  phoneValue: string;
  handleBlur: (e: React.FocusEvent<HTMLInputElement, Element>) => void;
}

const Phone: FC<PhoneProps> = ({ setFieldValue, phoneValue, handleBlur }) => {
  const handlePhoneChange = (value: string | undefined) => {
    setFieldValue(EBilling.PHONE_NUMBER, value);
  };

  return (
    <label className="billing__label" htmlFor={EBilling.PHONE_NUMBER}>
      <p className="required">Phone number</p>
      <PhoneInput
        inputClass="phone__input"
        containerClass="phone__container"
        inputProps={{ name: EBilling.PHONE_NUMBER }}
        value={phoneValue}
        onChange={handlePhoneChange}
        onBlur={handleBlur}
        disableDropdown
        autoFormat={false}
        placeholder="Phone number"
      />
      <ErrorMessage
        name={EBilling.PHONE_NUMBER}
        component="span"
        className="billing__error"
      />
    </label>
  );
};

export default Phone;
