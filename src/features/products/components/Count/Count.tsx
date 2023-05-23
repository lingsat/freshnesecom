import React, { ChangeEvent, useState } from "react";

import DropDown from "@CommonComponents/DropDown/DropDown";

import arrowIcon from "@Images/arrow_black.svg";

import "./Count.scss";

const Count = () => {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [count, setCount] = useState<string>("1");
  const [countGroup, setCountGroup] = useState<string>("Pcs");

  const handleHideMenu = () => {
    setShowMenu(false);
  };

  const handleShowMenu = () => {
    setShowMenu(true);
  };

  const handleChangeCount = (event: ChangeEvent<HTMLInputElement>) => {
    setCount(event.target.value);
    handleHideMenu();
  };

  const handleSetCountGroup = (newCountGroup: string) => {
    setCountGroup(newCountGroup);
    handleHideMenu();
  };

  return (
    <div className="count" onMouseLeave={handleHideMenu}>
      <label className="count__label">
        <input type="number" value={count} onChange={handleChangeCount} />
      </label>
      <div className="count__selector">
        <div className="count__btn" onMouseEnter={handleShowMenu}>
          {countGroup}
          <img
            className={`${showMenu ? "reverse__icon" : ""}`}
            src={arrowIcon}
            alt="DownArrow"
          />
        </div>
        {showMenu && (
          <DropDown
            size="small"
            list={["Pcs", "Kgs", "Box", "Pack"]}
            onClick={handleSetCountGroup}
          />
        )}
      </div>
    </div>
  );
};

export default Count;
