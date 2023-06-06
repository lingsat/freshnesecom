import { createSlice } from "@reduxjs/toolkit";

import { RootState } from "@Store/store";

export interface IAuthState {
  showAuth: boolean;
  // string temporary ***************************
  user: string | null;
}

const initialState: IAuthState = {
  showAuth: false,
  user: null,
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
  },
});

export const { showAuth, hideAuth } = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;

export default authSlice.reducer;
