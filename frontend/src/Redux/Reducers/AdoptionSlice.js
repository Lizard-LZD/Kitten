import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  adoptions: [],
  adoption: null,
  error: {},
  loading: true,
};

const adoptionSlice = createSlice({
  name: "adoption",
  initialState,
  reducers: {
    getAdoptionsSuccess(state, action) {
      state.adoptions = action.payload;
      state.adoption = null;
      state.loading = false;
    },
    getAdoptionSuccess(state, action) {
      state.adoption = action.payload;
      state.loading = false;
    },
    createAdoptionSuccess(state, action) {
      state.adoptions.unshift(action.payload);
      state.loading = false;
    },
    deleteAdoption(state, action) {
      const { id } = action.payload;
      state.adoptions = state.adoptions.filter(
        (adoption) => adoption._id !== id
      );
      state.loading = false;
    },
    applyAdoptionSuccess(state, action) {
      const updatedAdoptions = state.adoptions.map((adoption) => {
        if (adoption._id === action.payload._id) {
          return action.payload;
        }
        return adoption;
      });
      state.adoptions = updatedAdoptions;
      state.loading = false;
    },
    cancelApplySuccess(state, action) {
      const updatedAdoptions = state.adoptions.map((adoption) => {
        if (adoption._id === action.payload._id) {
          return action.payload;
        }
        return adoption;
      });
      state.adoptions = updatedAdoptions;
      state.loading = false;
    },
    adoptionError(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  getAdoptionsSuccess,
  createAdoptionSuccess,
  getAdoptionSuccess,
  deleteAdoption,
  applyAdoptionSuccess,
  cancelApplySuccess,
  adoptionError,
} = adoptionSlice.actions;

// Async Thunks
export const getAdoptions = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/adoptions");
    dispatch(getAdoptionsSuccess(res.data));
  } catch (error) {
    dispatch(adoptionError(error.response.data));
    console.log(error.response.data);
  }
};

export const getAdoption = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/adoptions/${id}`);
    dispatch(getAdoptionSuccess(res.data));
  } catch (error) {
    dispatch(adoptionError(error.response.data));
  }
};

export const createAdoption = (ownerId, kittenId) => async (dispatch) => {
  const formData = { owner: ownerId, kitten: kittenId };

  try {
    const res = await axios.post(`/api/adoptions`, formData);
    dispatch(createAdoptionSuccess(res.data));
  } catch (error) {
    dispatch(adoptionError(error.response.data));
    console.log(error.response.data);
  }
};

export const removeAdoption = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/adoptions/${id}`);
    dispatch(deleteAdoption(id));
  } catch (error) {
    dispatch(adoptionError(error.response.data));
  }
};

export const applyAdoption = (id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/adoptions/apply/${id}`);
    dispatch(applyAdoptionSuccess(res.data));
  } catch (error) {
    dispatch(adoptionError(error.response.data));
  }
};

export const cancelApply = (id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/adoptions/cancel/${id}`);
    dispatch(cancelApplySuccess(res.data));
  } catch (error) {
    dispatch(adoptionError(error.response.data));
  }
};

export default adoptionSlice.reducer;
