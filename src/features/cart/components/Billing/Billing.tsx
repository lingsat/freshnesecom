import React, { FC, useState } from "react";
import { Formik, Form, Field } from "formik";
import { Country } from "country-state-city";
import { ToastContainer, toast } from "react-toastify";

import { regularBillingFields } from "@/mock/billing";
import { billingSchema } from "@Cart/schemas/billing";
import Button, { EBtnStyle } from "@CommonComponents/Button/Button";
import InputField from "@CartComponents/InputField/InputField";
import CheckboxField from "@CartComponents/CheckboxField/CheckboxField";
import LocationSelector from "@CartComponents/LocationSelector/LocationSelector";

import "react-toastify/dist/ReactToastify.css";
import "./Billing.scss";

const Billing: FC = () => {
  const [countryCode, setCountryCode] = useState<string>("");

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    country: "",
    postCode: "",
    notes: "",
    spamCheck: false,
    policyCheck: false,
  };

  const countries = Country.getAllCountries();

  const notifyInvalidCountry = () =>
    toast("Invalid country name - choose from list");

  const successConfirm = () => toast("Order completed successfully!");

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={billingSchema}
        onSubmit={(values, action) => {
          const isCountryInArray = countries.find(
            (country) => country.name === values.country
          );

          if (isCountryInArray) {
            setCountryCode("");
            action.resetForm();
            successConfirm();
          } else {
            action.setErrors({ country: "Choose country from list" });
            notifyInvalidCountry();
          }
        }}>
        {({ isValid, dirty, setFieldValue, values }) => (
          <Form className="billing">
            <div className="billing__header">
              <h3 className="billing__title">Billing info</h3>
              <p className="billing__description">
                Please enter your billing info
              </p>
            </div>
            <fieldset className="billing__block">
              {regularBillingFields.map((field, index) => (
                <InputField
                  key={`field-${field.name}-${index}`}
                  name={field.name}
                  label={field.label}
                  placeholder={field.placeholder}
                  required={field.required}
                />
              ))}
              <LocationSelector
                allCountries={countries}
                setFieldValue={setFieldValue}
                countryValue={values.country}
                cityValue={values.city}
                countryCode={countryCode}
                setCountryCode={setCountryCode}
              />
            </fieldset>
            <div className="billing__header">
              <h3 className="billing__title">Additional informations</h3>
              <p className="billing__description">
                Need something else? We will make it for you!
              </p>
            </div>
            <fieldset className="billing__block">
              <label
                className="billing__label  billing__label--full"
                htmlFor="notes">
                <p>Order notes</p>
                <Field
                  className="billing__field  billing__field--textarea"
                  as="textarea"
                  id="notes"
                  name="notes"
                  cols={30}
                  rows={5}
                  placeholder="Need a specific delivery day? Sending a gitf? Let's say ..."
                />
              </label>
            </fieldset>
            <div className="billing__header">
              <h3 className="billing__title">Confirmation</h3>
              <p className="billing__description">
                We are getting to the end. Just few clicks and your order si
                ready!
              </p>
            </div>
            <fieldset className="billing__block">
              <CheckboxField name="spamCheck">
                I agree with sending an Marketing and newsletter emails. No
                spam, promissed!
              </CheckboxField>
              <CheckboxField name="policyCheck" required={true}>
                I agree with our <a href="#">terms and conditions</a> and{" "}
                <a href="#">privacy policy</a>.
              </CheckboxField>
            </fieldset>
            <Button
              type="submit"
              text="Complete order"
              style={EBtnStyle.BIG}
              disabled={!dirty || !isValid}
            />
          </Form>
        )}
      </Formik>
      <ToastContainer position="bottom-left" autoClose={3000} />
    </>
  );
};

export default Billing;
