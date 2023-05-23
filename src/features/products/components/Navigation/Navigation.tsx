import React from "react";
import { Link } from "react-router-dom";

import "./Navigation.scss";

const Navigation = () => (
  <ul className="list-nav">
    <li className="list-nav__item">
      <Link className="list-nav__link" to="/">
        Homepage
      </Link>
    </li>
    <li className="list-nav__item">
      <Link className="list-nav__link" to="/products">
        All products
      </Link>
    </li>
  </ul>
);

export default Navigation;
