import React, { FC } from "react";

import "./DropDown.scss";

interface DropDownProps {
  list: string[];
  onClick: (item: string) => void;
  clearValue?: string;
  position?: "left" | "center";
}

const DropDown: FC<DropDownProps> = ({
  list,
  onClick,
  clearValue = "",
  position = "left",
}) => {
  const handleClick = (item: string) => () => {
    onClick(item);
  };

  return (
    <ul
      className={`dropdown ${position === "center" ? "dropdown--center" : ""}`}>
      {!!clearValue && (
        <li className="dropdown__item" onClick={handleClick("")}>
          {clearValue}
        </li>
      )}
      {list.map((item, index) => (
        <li
          key={`brand-${item}-${index}`}
          className="dropdown__item"
          onClick={handleClick(item)}>
          {item}
        </li>
      ))}
    </ul>
  );
};

export default DropDown;
