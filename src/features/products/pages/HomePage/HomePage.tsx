import React, { FC } from "react";
import { Link } from "react-router-dom";

const HomePage: FC = () => {
  return (
    <div>
      <h2>Home Page</h2>
      <Link to="/products">To products List</Link>
    </div>
  );
};

export default HomePage;
