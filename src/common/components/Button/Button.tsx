import React, { FC } from "react";
import arrow from "@/assets/images/arrow_right.svg";
import "./Button.scss";

interface ButtonProps {
  text: string;
  onCLick: () => void;
  arrowDirection?: "right" | "bottom";
  disabled?: boolean;
}

const Button: FC<ButtonProps> = ({
  text,
  arrowDirection = "right",
  onCLick,
  disabled = false,
}) => {
  return (
    <button
      type="button"
      className="green-btn"
      disabled={disabled}
      onClick={onCLick}>
      {text}
      <img
        className={`green-btn__image ${
          arrowDirection === "bottom" ? "green-btn__image--bottom" : ""
        }`}
        src={arrow}
        alt="ArrowDown"
      />
    </button>
  );
};

export default Button;
