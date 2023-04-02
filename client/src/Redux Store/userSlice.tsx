import { createAsyncThunk, createReducer, createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  isLoading: false,
  error: false,
  profileIdOfUsers: null,
  followingId: null,
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
    changeProfile: (state, action) => {
      // @ts-ignore
      state.currentUser.profilePicture = action.payload;
    },

    // ????
    following: (state, action) => {
      // @ts-ignore

      state.currentUser.followingId = action.payload;
    },
    setUserProfileId: (state, action) => {
      state.profileIdOfUsers = action.payload;
    },
  },
});

export const {
  login,
  loginSuccess,
  loginFailure,
  logout,
  changeProfile,
  following,
  setUserProfileId,
} = userSlicer.actions;

export default userSlicer.reducer;
