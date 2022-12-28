import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState } from "./auth.interface";

const initialState: AuthState = {
  isLoggedIn: false,
  user: undefined,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state: AuthState, action: PayloadAction<AuthState["user"]>) {
      state.user = action.payload;
    },
  },
});

export const { setUser } = authSlice.actions;

export const authReducer = authSlice.reducer;
