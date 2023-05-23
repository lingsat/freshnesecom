import React, { FC } from "react";

import arrow from "@Images/arrow_right.svg";
import plus from "@Images/plus.svg";
import heart from "@Images/heart.svg";

import "./Button.scss";

interface ButtonProps {
  text: string;
  onCLick?: () => void;
  style?: "primary" | "secondary";
  image?: "arrow" | "plus" | "heart";
  imagePosition?: "right" | "left";
  arrowDirection?: "right" | "bottom";
  disabled?: boolean;
}

const Button: FC<ButtonProps> = ({
  text,
  onCLick,
  style = "primary",
  image = "arrow",
  imagePosition = "right",
  arrowDirection = "right",
  disabled = false,
}) => {
  const imageRes = image === "plus" ? plus : image === "heart" ? heart : arrow;

  return (
    <button
      type="button"
      className={`button${style === "secondary" ? " button--secondary" : ""}${
        imagePosition === "left" ? " image__left" : ""
      }`}
      disabled={disabled}
      onClick={onCLick}>
      {text}
      <img
        className={`button__image${
          arrowDirection === "bottom" ? " button__image--bottom" : ""
        }`}
        src={imageRes}
        alt="ButtonImage"
      />
    </button>
  );
};

export default Button;
