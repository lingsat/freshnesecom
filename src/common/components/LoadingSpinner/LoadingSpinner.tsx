import React, { FC } from "react";

import "./LoadingSpinner.scss";

const LoadinSpinner: FC = () => {
  return (
    <div className="lds-ring">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default LoadinSpinner;
