import { useSelector } from "react-redux";

import { selectAuth } from "@Features/auth/authSlice";

export const useAuth = () => {
  const { user, token } = useSelector(selectAuth);

  return { isAuth: !!token, user, token };
};
