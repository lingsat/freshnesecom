import React, { FC } from "react";

import Button, { EBtnStyle } from "@CommonComponents/Button/Button";

import "./Suggested.scss";

// interface SuggestedProps {}

const Suggested: FC = () => {
  return (
    <div className="suggested">
      <p className="suggested__discount">- 36 %</p>
      <img
        className="suggested__image"
        src="https://content2.rozetka.com.ua/goods/images/big/325629467.jpg"
        alt="Suggested"
      />
      <h4 className="suggested__title">Acer Aspire 5 A515-56-347N Slim</h4>
      <p className="suggested__description">
        Acer products are designed for your needs
      </p>
      <div className="suggested__block">
        <p className="suggested__price">3.26 USD</p>
        <Button text="Buy now" style={EBtnStyle.SMALL} />
      </div>
    </div>
  );
};

export default Suggested;
