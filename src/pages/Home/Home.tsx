import React from "react";
import { useNavigate } from "react-router-dom";

import { ERoutes } from "@/types/routes";
import Button from "@CommonComponents/Button/Button";

import "./Home.scss";

const Home = () => {
  const navigate = useNavigate();

  const handleNavigateToProducts = () => {
    navigate(ERoutes.PRODUCTS_LIST);
  };

  return (
    <div className="home">
      <h2 className="home__title">Wellcome to Freshnesecom!</h2>
      <Button text="See all Products" onCLick={handleNavigateToProducts} />
    </div>
  );
};

export default Home;
