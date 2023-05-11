import React, { FC, useState } from "react";
import arrowDownThin from "@/assets/images/arrow_down_thin.svg";
import "./ListFilter.scss";

const ListFilter: FC = () => {
  const [showFilter, setShowFIlter] = useState<boolean>(false);

  const handleFilterHide = () => {
    setShowFIlter(false);
  };

  const handleFilterShow = () => {
    setShowFIlter(true);
  };

  return (
    <>
      <div
        className={`filter ${showFilter && "filter--show"}`}
        onMouseEnter={handleFilterShow}
        onMouseLeave={handleFilterHide}>
        Filter
      </div>
      <div
        className="filter__switcher"
        onMouseEnter={handleFilterShow}
        onMouseLeave={handleFilterHide}>
        Show Filter
        <img
          className={`${showFilter && "reverse__icon"}`}
          src={arrowDownThin}
          alt="DownArrow"
        />
      </div>
    </>
  );
};

export default ListFilter;
