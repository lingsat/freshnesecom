import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  GithubAuthProvider,
} from "firebase/auth";

import { app } from "@/firebase";

export const auth = getAuth(app);

// Google singIn with Popup
const googleProvider = new GoogleAuthProvider();
export const signInWithGoogle = () => {
  return signInWithPopup(auth, googleProvider);
};

// GitHub signIn with Popup
const githubProvider = new GithubAuthProvider();
export const signInWithGitHub = () => {
  return signInWithPopup(auth, githubProvider);
};
