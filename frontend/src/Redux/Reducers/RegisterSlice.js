import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  name: "",
  email: "",
  password: "",
  password2: "",
  error: null,
};

const RegisterSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    setField: (state, action) => {
      const { field, value } = action.payload;
      state[field] = value;
    },
    registrationSuccess: (state) => {
      state.error = null;
    },
    registrationFailure: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setField, registrationSuccess, registrationFailure } = RegisterSlice.actions;

// 使用Redux Thunk来处理异步逻辑
export const registerUser = (newUser) => async (dispatch) => {
  try {
    console.log(newUser);
    const config = { headers: { "Content-Type": "application/json" } };
    const body = JSON.stringify(newUser);
    const res = await axios.post("/api/users", body, config);
    console.log(res.data);
    dispatch(registrationSuccess());
  } catch (err) {
    console.error(err.response.data);
    dispatch(registrationFailure(err.response.data));
  }
};

export default RegisterSlice.reducer;
