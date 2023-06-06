import { useSelector } from "react-redux";

import { selectAuth } from "@Features/auth/authSlice";

export const useAuth = () => {
  const { user, token } = useSelector(selectAuth);

  const userId = user ? user.user_id : null;

  return { isAuth: !!token, user, token, userId };
};
