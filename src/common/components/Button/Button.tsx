import React, { FC } from "react";

import arrow from "@Images/arrow_right.svg";
import plus from "@Images/plus.svg";
import heart from "@Images/heart.svg";

import "./Button.scss";

export enum EBtnStyle {
  PRIMARY = "primary",
  SECONDARY = "secondary",
  SMALL = "small",
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
  onCLick?: () => void;
  style?: EBtnStyle;
  image?: EBtnImage;
  imagePosition?: EBtnImagePos;
  arrowDirection?: EBtnArrowDir;
  disabled?: boolean;
}

const Button: FC<ButtonProps> = ({
  text,
  onCLick,
  style = EBtnStyle.PRIMARY,
  image = EBtnImage.ARROW,
  imagePosition = EBtnImagePos.RIGHT,
  arrowDirection = EBtnArrowDir.RIGHT,
  disabled = false,
}) => {
  const imageRes = { plus, heart, arrow }[image];

  return (
    <button
      type="button"
      className={`button${
        style === EBtnStyle.SECONDARY ? " button--secondary" : ""
      }${style === EBtnStyle.SMALL ? " button--small" : ""}${
        imagePosition === EBtnImagePos.LEFT ? " image__left" : ""
      }`}
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
