import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "@Store/store";

import { IUser } from "./types/auth";

export interface IAuthState {
  showAuth: boolean;
  user: IUser | null;
  token: string | null;
}

const initialState: IAuthState = {
  showAuth: false,
  user: null,
  token: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    showAuth(state) {
      state.showAuth = true;
    },
    hideAuth(state) {
      state.showAuth = false;
    },
    setUser(
      state,
      action: PayloadAction<{ user: IUser; token: string | null }>
    ) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.showAuth = false;
    },
    removeUser(state) {
      state.user = null;
      state.token = null;
    },
  },
});

export const { showAuth, hideAuth, setUser, removeUser } = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;

export default authSlice.reducer;
