import React, { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "@Store/store";
import { hideAuth, IAuthState, selectAuth } from "@Features/auth/authSlice";
import Button from "@CommonComponents/Button/Button";

import "./Auth.scss";

const Auth: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { showAuth } = useSelector<RootState, IAuthState>(selectAuth);

  const handleModalClose = () => {
    dispatch(hideAuth());
  };

  const handleModalPropagation = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  useEffect(() => {
    if (showAuth) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "unset";
      };
    }
  }, [showAuth]);

  return (
    <div className="auth" onClick={handleModalClose}>
      <div className="auth__block" onClick={handleModalPropagation}>
        <h2>Login with:</h2>
        <div className="auth__buttons">
          <Button text="Login with Google" />
          <Button text="Login with GitHub" />
        </div>
      </div>
    </div>
  );
};

export default Auth;
