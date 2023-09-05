import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { clearKittens } from './KittenSlice';
import {clearAdoptions} from  "./AdoptionSlice"

const initialState = {
  userProfiles: [], // Array to store user profiles
  userProfile: null, // Single user profile
  viewProfile: null,
  loading: true,
  error: {},
};

const userProfileSlice = createSlice({
  name: "userProfile",
  initialState,
  reducers: {
    getUserProfileSuccess(state, action) {
      state.userProfile = action.payload;
      state.loading = false;
    },
    viewUserProfileSuccess(state, action) {
      state.viewProfile = action.payload;
      state.loading = false;
    },
    getUserProfilesSuccess(state, action) {
      state.userProfiles = action.payload;
      state.loading = false;
    },
    updateUserProfileSuccess(state, action) {
      state.userProfile = action.payload;
      state.loading = false;
    },
    clearUserProfile(state) {
      state.userProfile = null;
      state.loading = true;
      state.error = {};
    },
    userProfileError(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  getUserProfileSuccess,
  getUserProfilesSuccess,
  viewUserProfileSuccess,
  updateUserProfileSuccess,
  clearUserProfile,
  userProfileError,
} = userProfileSlice.actions;

export const getUserProfile = (userId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/profile/user/${userId}`);
    dispatch(getUserProfileSuccess(res.data));
  } catch (error) {
    dispatch(userProfileError(error.response.data));
    console.log(error.response.data);
  }
};

export const viewUserProfile = (userId) => async (dispatch) => {
  try {
    console.log("111111");
    const res = await axios.get(`/api/profile/user/${userId}`);
    dispatch(viewUserProfileSuccess(res.data));
    console.log("res: ", res);
  } catch (error) {
    dispatch(userProfileError(error.response.data));
    console.log(error.response.data);
  }
};

export const getUserProfiles = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/profile");
    dispatch(getUserProfilesSuccess(res.data));
  } catch (error) {
    dispatch(userProfileError(error.response.data));
    console.log(error.response.data);
  }
};

export const updateUserProfile = (userData) => async (dispatch) => {
  try {
    const res = await axios.post("/api/profile", userData);
    dispatch(updateUserProfileSuccess(res.data));
  } catch (error) {
    dispatch(userProfileError(error.response.data));
    console.log(error.response.data);
  }
};

export const deleteUserProfile = () => async (dispatch) => {
  try {
    await axios.delete("/api/profile");
    dispatch(clearUserProfile());
    dispatch(clearKittens()); // 清空kitten
    dispatch(clearAdoptions())
  } catch (error) {
    dispatch(userProfileError(error.response.data));
    console.log(error.response.data);
  }
};

export default userProfileSlice.reducer;
