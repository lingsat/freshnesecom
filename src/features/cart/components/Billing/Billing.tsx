import React, { FC, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, FormikHelpers, ErrorMessage } from "formik";
import { Country } from "country-state-city";
import { toast } from "react-toastify";

import { AppDispatch } from "@Store/store";
import { clearCart } from "@Cart/cartSlice";
import { regularBillingFields } from "@/mock/billing";
import { billingSchema } from "@Cart/schemas/billing";
import { ELocation } from "@Cart/types/location";
import { ERoutes } from "@/types/routes";
import Button, { EBtnStyle } from "@CommonComponents/Button/Button";
import InputField from "@CartComponents/InputField/InputField";
import CheckboxField from "@CartComponents/CheckboxField/CheckboxField";
import LocationSelector from "@CartComponents/LocationSelector/LocationSelector";
import PhoneField from "@CartComponents/PhoneField/PhoneField";
import PostCodeField from "@CartComponents/PostCodeField/PostCodeField";

import "react-toastify/dist/ReactToastify.css";
import "./Billing.scss";

const Billing: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [countryCode, setCountryCode] = useState<string>("");

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
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

  const handleFormSubmit = (
    values: typeof initialValues,
    action: FormikHelpers<typeof initialValues>
  ) => {
    const isCountryInArray = countries.find(
      (country) => country.name === values.country
    );

    if (isCountryInArray) {
      setCountryCode("");
      dispatch(clearCart());
      action.resetForm();
      successConfirm();
      navigate(`/${ERoutes.PRODUCTS_LIST}`);
    } else {
      action.setErrors({ country: "Choose country from list" });
      notifyInvalidCountry();
    }
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={billingSchema}
        onSubmit={handleFormSubmit}>
        {({ isValid, dirty, setFieldValue, values, handleBlur }) => (
          <Form className="billing">
            <fieldset className="billing__block">
              <div className="billing__header">
                <h3 className="billing__title">Billing info</h3>
                <p className="billing__description">
                  Please enter your billing info
                </p>
              </div>
              {regularBillingFields.map((field, index) => (
                <InputField
                  key={`field-${field.name}-${index}`}
                  name={field.name}
                  label={field.label}
                  type={field.type}
                  placeholder={field.placeholder}
                  required={field.required}
                />
              ))}
              <PhoneField
                setFieldValue={setFieldValue}
                handleBlur={handleBlur}
                phoneValue={values.phoneNumber}
              />
              <LocationSelector
                allCountries={countries}
                setFieldValue={setFieldValue}
                countryValue={values.country}
                cityValue={values.city}
                countryCode={countryCode}
                setCountryCode={setCountryCode}
              />
              <label className="billing__label" htmlFor={ELocation.ADDRESS}>
                <p className="required">Address</p>
                <Field
                  className="billing__field"
                  id={ELocation.ADDRESS}
                  name={ELocation.ADDRESS}
                  placeholder="Address"
                />
                <ErrorMessage
                  name={ELocation.ADDRESS}
                  component="span"
                  className="billing__error"
                />
              </label>
              <PostCodeField setFieldValue={setFieldValue} />
            </fieldset>
            <fieldset className="billing__block">
              <div className="billing__header">
                <h3 className="billing__title">Additional informations</h3>
                <p className="billing__description">
                  Need something else? We will make it for you!
                </p>
              </div>
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
            <fieldset className="billing__block">
              <div className="billing__header">
                <h3 className="billing__title">Confirmation</h3>
                <p className="billing__description">
                  We are getting to the end. Just few clicks and your order si
                  ready!
                </p>
              </div>
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
    </>
  );
};

export default Billing;
