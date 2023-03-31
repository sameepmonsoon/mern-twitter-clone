import { createAsyncThunk, createReducer, createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  isLoading: false,
  error: false,
};

export const userSlicer = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state) => {
      state.isLoading = true;
      state.error = false;
    },
    loginSuccess: (state, action) => {
      (state.isLoading = false), (state.currentUser = action.payload);
    },
    loginFailure: (state) => {
      (state.isLoading = true), (state.error = true);
    },
    logout: (state) => {
      return initialState;
    },
  },
});

export const { login, loginSuccess, loginFailure, logout } = userSlicer.actions;

export default userSlicer.reducer;
