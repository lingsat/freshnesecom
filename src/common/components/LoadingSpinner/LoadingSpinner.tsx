import React from "react";

import "./LoadingSpinner.scss";

const LoadinSpinner = () => {
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
