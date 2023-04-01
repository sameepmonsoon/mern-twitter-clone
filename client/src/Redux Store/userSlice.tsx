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
    changeProfile: (state, action) => {
      // @ts-ignore
      state.currentUser.profilePicture = action.payload;
    },

    // ????
    following: (state, action) => {
      // @ts-ignore

      if (state.currentUser.following.includes(action.payload)) {
        // @ts-ignore

        state.currentUser.following.splice(
          // @ts-ignore

          state.currentUser.following.findIndex((followingId) => {
            followingId === action.payload;
          })
        );
      } else {
        // @ts-ignore

        state.currentUser.following.push(action.payload);
      }
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
} = userSlicer.actions;

export default userSlicer.reducer;
