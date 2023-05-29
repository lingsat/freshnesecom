import React, { FC } from "react";

import { billingFields } from "@/mock/billing";
import Button, { EBtnStyle } from "@CommonComponents/Button/Button";

import "./Billing.scss";

const Billing: FC = () => {
  return (
    <form className="billing">
      <div className="billing__header">
        <h3 className="billing__title">Billing info</h3>
        <p className="billing__description">Please enter your billing info</p>
      </div>
      <fieldset className="billing__block">
        {billingFields.map((field, index) => (
          <label
            key={`field-${field.name}-${index}`}
            className="billing__label">
            <p>{field.label}</p>
            <input
              type={field.type}
              placeholder={field.placeholder}
              className="billing__field"
            />
          </label>
        ))}
      </fieldset>
      <div className="billing__header">
        <h3 className="billing__title">Additional informations</h3>
        <p className="billing__description">
          Need something else? We will make it for you!
        </p>
      </div>
      <fieldset className="billing__block">
        <label className="billing__label billing__label--full">
          <p>Order notes</p>
          <textarea
            cols={30}
            rows={5}
            className="billing__field billing__field--textarea"
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
        <label className="billing__confirm">
          <input type="checkbox" className="billing__checkbox" />
          <p className="billing__label-text">
            I agree with sending an Marketing and newsletter emails. No spam,
            promissed!
          </p>
        </label>
        <label className="billing__confirm">
          <input type="checkbox" className="billing__checkbox" />
          <p className="billing__label-text">
            I agree with our <a href="#">terms and conditions</a> and{" "}
            <a href="#">privacy policy</a>.
          </p>
        </label>
      </fieldset>
      <Button text="Complete order" style={EBtnStyle.BIG} />
    </form>
  );
};

export default Billing;
