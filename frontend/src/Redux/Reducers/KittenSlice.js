import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  kittens: [],
  kitten: null,
  applicants: [],
  error: {},
  loading: true,
};

const kittenSlice = createSlice({
  name: "kitten",
  initialState,
  reducers: {
    getKittensSuccess(state, action) {
      state.kittens = action.payload;
      state.loading = false;
    },
    addKittenSuccess(state, action) {
      state.kittens.unshift(action.payload);
      state.loading = false;
    },
    deleteKittenSuccess(state, action) {
      const updatedKittens = state.kittens.filter(
        (kitten) => kitten._id !== action.payload
      );
      state.kittens = updatedKittens;
      state.loading = false;
    },
    updateKittenSuccess(state, action) {
      state.kittens = state.kittens.map((kitten) =>
        kitten._id === action.payload._id ? action.payload : kitten
      );
      state.loading = false;
    },
    profileError(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  getKittensSuccess,
  addKittenSuccess,
  deleteKittenSuccess,
  updateKittenSuccess,
  profileError,
} = kittenSlice.actions;

export const getKittens = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/profile/kittens");
    dispatch(getKittensSuccess(res.data));
  } catch (error) {
    dispatch(profileError(error.response.data));
    console.log(error.response.data);
  }
};

export const addKitten = (kittenData) => async (dispatch) => {
  try {
    const res = await axios.post("/api/profile/kittens", kittenData);
    dispatch(addKittenSuccess(res.data));
  } catch (error) {
    dispatch(profileError(error.response.data));
    console.log(error.response.data);
  }
};

export const deleteKitten = (kittenId) => async (dispatch) => {
  try {
    await axios.delete(`/api/profile/kittens/${kittenId}`);
    dispatch(deleteKittenSuccess(kittenId));
  } catch (error) {
    dispatch(profileError(error.response.data));
    console.log(error.response.data);
  }
};

export const updateKitten = (kittenId, kittenData) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/profile/kittens/${kittenId}`, kittenData);
    dispatch(updateKittenSuccess(res.data));
  } catch (error) {
    dispatch(profileError(error.response.data));
    console.log(error.response.data);
  }
};

export default kittenSlice.reducer;
