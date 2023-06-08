import React, { FC, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import {
  Formik,
  Form,
  Field,
  FormikHelpers,
  ErrorMessage,
  FormikProps,
} from "formik";
import { PersistFormikValues } from "formik-persist-values";
import { toast } from "react-toastify";

import { AppDispatch } from "@Store/store";
import { clearCart } from "@Cart/cartSlice";
import { useAuth } from "@/hooks/useAuth";
import { getCountries } from "@Cart/utils/location";
import { regularBillingFields } from "@/mock/billing";
import { billingSchema } from "@Cart/schemas/billing";
import { ICountry } from "@Cart/types/location";
import { EBilling, IInitialValues } from "@Cart/types/billing";
import { EBtnStyle } from "@/common/types/button";
import { LOCAL_STORAGE_COUNTRY, LOCAL_STORAGE_USER } from "@/constants";
import Button from "@CommonComponents/Button/Button";
import Input from "@CartComponents/Input/Input";
import Checkbox from "@CartComponents/Checkbox/Checkbox";
import Location from "@CartComponents/Location/Location";
import Phone from "@CartComponents/Phone/Phone";
import PostCode from "@CartComponents/PostCode/PostCode";

import "react-toastify/dist/ReactToastify.css";
import "./Billing.scss";

const Billing: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { userId, user, userFirstName, userLastName } = useAuth();

  const formikRef = useRef<FormikProps<IInitialValues>>(null);
  const [countryCode, setCountryCode] = useState<string>(
    localStorage.getItem(LOCAL_STORAGE_COUNTRY) || ""
  );
  const [countries, setCountries] = useState<ICountry[]>([]);

  const initialValues: IInitialValues = {
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

  const notifyInvalidCountry = () =>
    toast.warn("Invalid country name - choose from list");

  const successConfirm = () => toast.success("Order completed successfully!");

  const handleFormSubmit = (
    values: typeof initialValues,
    action: FormikHelpers<typeof initialValues>
  ) => {
    const isCountryInArray = countries.find(
      (country) => country.country === values.country
    );

    if (isCountryInArray) {
      setCountryCode("");
      dispatch(clearCart(userId));
      action.resetForm();
      localStorage.removeItem(LOCAL_STORAGE_USER);
      localStorage.removeItem(LOCAL_STORAGE_COUNTRY);
      successConfirm();
    } else {
      action.setErrors({ country: "Choose country from list" });
      notifyInvalidCountry();
    }
  };

  useEffect(() => {
    if (formikRef.current) {
      const touchedObj: { [field: string]: boolean } = {};

      const entries = Object.entries(formikRef.current.values);
      entries.forEach((entrie) => {
        entrie[1]
          ? (touchedObj[entrie[0]] = true)
          : (touchedObj[entrie[0]] = false);
      });

      formikRef.current.setTouched(touchedObj);
    }
  });

  useEffect(() => {
    if (user) {
      formikRef.current?.setValues({
        ...initialValues,
        email: user.email,
        firstName: userFirstName,
        lastName: userLastName,
      });
    } else {
      formikRef.current?.setValues(initialValues);
    }
  }, [user]);

  const fetchCountries = async () => {
    const data = await getCountries();
    setCountries(data);
  };

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_COUNTRY, countryCode);
  }, [countryCode]);

  useEffect(() => {
    fetchCountries();
  }, []);

  return (
    <>
      <Formik
        innerRef={formikRef}
        initialValues={initialValues}
        validationSchema={billingSchema}
        enableReinitialize={true}
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
                <Input
                  key={`field-${field.name}-${index}`}
                  name={field.name}
                  label={field.label}
                  type={field.type}
                  placeholder={field.placeholder}
                  required={field.required}
                />
              ))}
              <Phone
                setFieldValue={setFieldValue}
                handleBlur={handleBlur}
                phoneValue={values.phoneNumber}
              />
              <Location
                allCountries={countries}
                setFieldValue={setFieldValue}
                countryValue={values.country}
                cityValue={values.city}
                countryCode={countryCode}
                setCountryCode={setCountryCode}
              />
              <label className="billing__label" htmlFor={EBilling.ADDRESS}>
                <p className="required">Address</p>
                <Field
                  className="billing__field"
                  id={EBilling.ADDRESS}
                  name={EBilling.ADDRESS}
                  placeholder="Address"
                />
                <ErrorMessage
                  name={EBilling.ADDRESS}
                  component="span"
                  className="billing__error"
                />
              </label>
              <PostCode setFieldValue={setFieldValue} />
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
              <Checkbox name="spamCheck">
                I agree with sending an Marketing and newsletter emails. No
                spam, promissed!
              </Checkbox>
              <Checkbox name="policyCheck" required={true}>
                I agree with our <a href="#">terms and conditions</a> and{" "}
                <a href="#">privacy policy</a>.
              </Checkbox>
            </fieldset>
            <Button
              type="submit"
              text="Complete order"
              style={EBtnStyle.BIG}
              disabled={!dirty || !isValid}
            />
            <PersistFormikValues
              name={LOCAL_STORAGE_USER}
              persistInvalid={true}
            />
          </Form>
        )}
      </Formik>
    </>
  );
};

export default Billing;
