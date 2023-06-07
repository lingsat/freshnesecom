import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

import { app } from "@/firebase";

export const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();
export const signInWithGoogle = () => {
  return signInWithPopup(auth, googleProvider);
};
