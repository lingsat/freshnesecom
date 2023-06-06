import { useSelector } from "react-redux";

import { selectAuth } from "@Features/auth/authSlice";

export const useAuth = () => {
  const { userEmail, token } = useSelector(selectAuth);

  return { isAuth: !!token, userEmail, token };
};
