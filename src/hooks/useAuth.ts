import { useSelector } from "react-redux";

import { selectAuth } from "@Auth/authSlice";

export const useAuth = () => {
  const { user, token } = useSelector(selectAuth);

  const userId = user ? user.user_id : null;
  const [userFirstName, userLastName] = (user?.name || "").split(" ");

  return { isAuth: !!token, user, token, userId, userFirstName, userLastName };
};
