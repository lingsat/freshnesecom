import React, { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { AppDispatch } from "@Store/store";
import { removeUser } from "@Auth/authSlice";
import { useAuth } from "@/hooks/useAuth";
import { ERoutes } from "@/types/routes";
import Button from "@CommonComponents/Button/Button";

import "./Profile.scss";

const Profile: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { isAuth, user } = useAuth();

  const notifyNotLoggedIn = () =>
    toast.warn("The Profile is available only to authorized users");
  const notifyLogOut = () => toast.warn("Logged Out successfully!");

  const handleLogOut = () => {
    dispatch(removeUser());
    navigate(`/${ERoutes.PRODUCTS_LIST}`);
    notifyLogOut();
    localStorage.removeItem("userData");
  };

  useEffect(() => {
    if (!isAuth) {
      navigate(`/${ERoutes.PRODUCTS_LIST}`);
      notifyNotLoggedIn();
    }
  }, []);

  useEffect(() => {
    if (!isAuth) {
      navigate(`/${ERoutes.PRODUCTS_LIST}`);
    }
  });

  if (!user) {
    return <p className="profile__error">User not Found!</p>;
  }

  return (
    <div className="profile">
      <img className="profile__image" src={user.picture} alt={user.name} />
      <div>
        <p className="profile__text">
          Name: <span>{user.name}</span>
        </p>
        <p className="profile__text">
          Email: <span>{user.email}</span>
        </p>
      </div>
      <Button text="Log Out" onCLick={handleLogOut} />
    </div>
  );
};

export default Profile;
