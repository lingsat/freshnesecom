import { useSelector } from "react-redux";

import { selectAuth } from "@Features/auth/authSlice";

export const useAuth = () => {
  const { user, token } = useSelector(selectAuth);

  const userId = user ? user.user_id : null;
  const userFirstName = user ? user.name.split(" ")[0] : "";
  const userLastName = user ? user.name.split(" ")[1] : "";

  return { isAuth: !!token, user, token, userId, userFirstName, userLastName };
};
