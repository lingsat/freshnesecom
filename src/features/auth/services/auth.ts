import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import jwt_decode from "jwt-decode";

import { app } from "@/firebase";
import { IUser } from "@Auth/types/auth";

export const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  const userData = await signInWithPopup(auth, googleProvider);
  const token = await userData.user.getIdToken();
  const user: IUser = jwt_decode(token);
  return { user, token };
};
