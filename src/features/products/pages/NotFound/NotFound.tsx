import React from "react";
import { Link } from "react-router-dom";

import "./NotFound.scss";

const NotFound = () => {
  return (
    <div className="error">
      <h2>Page not Found!</h2>
      <p>
        Go to the <Link to="/">Homepage</Link>
      </p>
    </div>
  );
};

export default NotFound;
