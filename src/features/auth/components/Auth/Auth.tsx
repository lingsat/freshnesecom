import React, { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import jwt_decode from "jwt-decode";

import { IUser } from "@Features/auth/types/auth";
import { AppDispatch, RootState } from "@Store/store";
import {
  hideAuth,
  IAuthState,
  selectAuth,
  setUser,
} from "@Features/auth/authSlice";
import { signInWithGoogle } from "@Features/auth/services/auth";

import googleIcon from "@Images/google.svg";

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

  const handleGoogleAuth = async () => {
    try {
      const userData = await signInWithGoogle();
      const token = await userData.user.getIdToken();
      const user: IUser = jwt_decode(token);
      dispatch(setUser({ user, token }));
    } catch (error) {
      console.log(error);
    }
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
        <h2>Log In with:</h2>
        <button className="auth__btn" onClick={handleGoogleAuth}>
          <img src={googleIcon} alt="Google" />
          Sign in with Google
        </button>
        <p className="auth__text">
          Authorized Users can add favorite products to <span>Wishlist </span>
          and have access to <span>Profile </span>page!
        </p>
      </div>
    </div>
  );
};

export default Auth;
