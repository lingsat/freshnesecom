import React, { FC } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

import { regularBillingFields } from "@/mock/billing";
import { billingSchema } from "@Cart/schemas/billing";
import Button, { EBtnStyle } from "@CommonComponents/Button/Button";

import "./Billing.scss";

const Billing: FC = () => {
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

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={billingSchema}
      onSubmit={(values) => {
        console.log(values);
      }}>
      <Form className="billing">
        <div className="billing__header">
          <h3 className="billing__title">Billing info</h3>
          <p className="billing__description">Please enter your billing info</p>
        </div>
        <fieldset className="billing__block">
          {regularBillingFields.map((field, index) => (
            <label
              key={`field-${field.name}-${index}`}
              className="billing__label"
              htmlFor={field.name}>
              <p>{field.label}</p>
              <Field
                className="billing__field"
                type={field.type}
                id={field.name}
                name={field.name}
                placeholder={field.placeholder}
              />
              <ErrorMessage
                component="span"
                className="billing__error"
                name={field.name}
              />
            </label>
          ))}
          <label className="billing__label" htmlFor="country">
            <p>State / Country</p>
            <Field
              className="billing__field"
              as="select"
              id="country"
              name="country">
              <option value="" disabled hidden>
                Chose a state or Country
              </option>
              <option value="Ukraine">Ukraine</option>
              <option value="USA">USA</option>
              <option value="Poland">Poland</option>
            </Field>
            <ErrorMessage
              component="span"
              className="billing__error"
              name="country"
            />
          </label>
          <label className="billing__label" htmlFor="city">
            <p>Town / City</p>
            <Field className="billing__field" as="select" id="city" name="city">
              <option value="" disabled hidden>
                Town or City
              </option>
              <option value="Sumy">Sumy</option>
              <option value="Kyiv">Kyiv</option>
              <option value="Lviv">Lviv</option>
            </Field>
            <ErrorMessage
              component="span"
              className="billing__error"
              name="city"
            />
          </label>
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
            We are getting to the end. Just few clicks and your order si ready!
          </p>
        </div>
        <fieldset className="billing__block">
          <label className="billing__confirm" htmlFor="spamCheck">
            <p className="billing__label-text">
              I agree with sending an Marketing and newsletter emails. No spam,
              promissed!
            </p>
            <Field
              className="billing__checkbox"
              type="checkbox"
              id="spamCheck"
              name="spamCheck"
            />
            <ErrorMessage
              component="span"
              className="billing__error"
              name="spamCheck"
            />
          </label>
          <label className="billing__confirm" htmlFor="policyCheck">
            <p className="billing__label-text">
              I agree with our <a href="#">terms and conditions</a> and{" "}
              <a href="#">privacy policy</a>.
            </p>
            <Field
              className="billing__checkbox"
              type="checkbox"
              id="policyCheck"
              name="policyCheck"
            />
            <ErrorMessage
              component="span"
              className="billing__error"
              name="policyCheck"
            />
          </label>
        </fieldset>
        <Button type="submit" text="Complete order" style={EBtnStyle.BIG} />
      </Form>
    </Formik>
  );
};

export default Billing;
