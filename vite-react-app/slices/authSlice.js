import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem("username", action.payload.userName);
      localStorage.setItem("userId", action.payload.userId);
      localStorage.setItem("isAuthenticated", "true");
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("username");
      localStorage.removeItem("userId");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
