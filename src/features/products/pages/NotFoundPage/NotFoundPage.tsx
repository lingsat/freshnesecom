import React, { FC } from "react";
import { Link } from "react-router-dom";
import "./NotFoundPage.scss";

const NotFoundPage: FC = () => {
  return (
    <div className="error">
      <h2>Page not Found!</h2>
      <p>
        Go to the <Link to="/">Homepage</Link>
      </p>
    </div>
  );
};

export default NotFoundPage;
