import React, { FC } from "react";

import arrow from "@Images/arrow_right.svg";
import plus from "@Images/plus.svg";
import heart from "@Images/heart.svg";

import "./Button.scss";

export enum EBtnStyle {
  PRIMARY = "primary",
  SECONDARY = "secondary",
  SMALL = "small",
  BIG = "big",
}

export enum EBtnImage {
  ARROW = "arrow",
  PLUS = "plus",
  HEART = "heart",
}

export enum EBtnImagePos {
  RIGHT = "right",
  LEFT = "left",
}

export enum EBtnArrowDir {
  RIGHT = "right",
  BOTTOM = "bottom",
}

interface ButtonProps {
  text: string;
  type?: "button" | "submit" | "reset" | undefined;
  onCLick?: () => void;
  style?: EBtnStyle;
  image?: EBtnImage;
  imagePosition?: EBtnImagePos;
  arrowDirection?: EBtnArrowDir;
  disabled?: boolean;
}

const Button: FC<ButtonProps> = ({
  text,
  type = "button",
  onCLick,
  style = EBtnStyle.PRIMARY,
  image = EBtnImage.ARROW,
  imagePosition = EBtnImagePos.RIGHT,
  arrowDirection = EBtnArrowDir.RIGHT,
  disabled = false,
}) => {
  const imageRes = { plus, heart, arrow }[image];

  const getBtnClassStr = () => {
    let classStr = "button";

    switch (style) {
      case EBtnStyle.SECONDARY:
        classStr += " button--secondary";
        break;
      case EBtnStyle.SMALL:
        classStr += " button--small";
        break;
      case EBtnStyle.BIG:
        classStr += " button--big";
        break;
    }

    if (imagePosition === EBtnImagePos.LEFT) {
      classStr += " image__left";
    }

    return classStr;
  };

  const btnClassStr = getBtnClassStr();

  return (
    <button
      type={type}
      className={btnClassStr}
      disabled={disabled}
      onClick={onCLick}>
      {text}
      <img
        className={`button__image${
          arrowDirection === EBtnArrowDir.BOTTOM ? " button__image--bottom" : ""
        }`}
        src={imageRes}
        alt="ButtonImage"
      />
    </button>
  );
};

export default Button;
