import React, { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UserCredential } from "firebase/auth";

import { AppDispatch, RootState } from "@Store/store";
import {
  hideAuth,
  IAuthState,
  selectAuth,
  setUser,
} from "@Features/auth/authSlice";
import Button from "@CommonComponents/Button/Button";

import "./Auth.scss";
import { signInWithGitHub, signInWithGoogle } from "../../services/auth";

const Auth: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { showAuth } = useSelector<RootState, IAuthState>(selectAuth);

  const handleModalClose = () => {
    dispatch(hideAuth());
  };

  const handleModalPropagation = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  const handleGoogleAuth = async () => {
    const userData: UserCredential = await signInWithGoogle();
    const token = await userData.user.getIdToken();

    dispatch(setUser({ userEmail: userData.user.email, token }));
  };

  // const handleGitHubAuth = async () => {
  //   const userData: UserCredential = await signInWithGitHub();
  //   const token = await userData.user.getIdToken();

  //   dispatch(setUser({ user: userData.user.displayName, token }));
  // };

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
          <Button text="Login with Google" onCLick={handleGoogleAuth} />
          {/* <Button text="Login with GitHub" onCLick={handleGitHubAuth} /> */}
        </div>
      </div>
    </div>
  );
};

export default Auth;
