import React from "react";
import { useNavigate } from "react-router-dom";

import { ERoutes } from "@/types/routes";
import Button from "@CommonComponents/Button/Button";

import "./NotFound.scss";

const NotFound = () => {
  const navigate = useNavigate();

  const handleNavigateToHome = () => {
    navigate(ERoutes.HOME);
  };

  return (
    <div className="not-found">
      <h2>Page not Found!</h2>
      <Button text="Go to the Homepage" onCLick={handleNavigateToHome} />
    </div>
  );
};

export default NotFound;
