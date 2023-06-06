import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "@Store/store";

export interface IAuthState {
  showAuth: boolean;
  userEmail: string | null;
  token: string | null;
}

const initialState: IAuthState = {
  showAuth: false,
  userEmail: null,
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
      action: PayloadAction<{ userEmail: string | null; token: string | null }>
    ) {
      state.userEmail = action.payload.userEmail;
      state.token = action.payload.token;
      state.showAuth = false;
    },
    removeUser(state) {
      state.userEmail = null;
      state.token = null;
    },
  },
});

export const { showAuth, hideAuth, setUser, removeUser } = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;

export default authSlice.reducer;
