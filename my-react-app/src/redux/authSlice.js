import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  uid: null,
  email: null,
  username: null,
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.uid = action.payload.uid;
      state.email = action.payload.email;
      state.username = action.payload.username;
    },
    logout: (state) => {
      state.uid = null;
      state.email = null;
      state.username = null;
    },
  },
});

export const { login, logout } = AuthSlice.actions;
export default AuthSlice.reducer;