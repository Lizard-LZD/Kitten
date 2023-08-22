import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import setAuthToken from "../../Utils/setAuthToken";

const initialState = {
  email: "",
  password: "",
  currentUser: null,
  error: null,
};

const LoginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setField: (state, action) => {
      const { field, value } = action.payload;
      state[field] = value;
    },
    setCurrentUser: (state, action) => {
      const { _id } = action.payload;
      state.currentUser = _id;
      console.log(state.currentUser);
    },
    loginSuccess: (state) => {
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.error = action.payload;
    },
    logout: (state) => {
      state.email = "";
      state.password = "";
      state.error = null;
    },
  },
});

export const { setField, setCurrentUser, loginSuccess, loginFailure, logout } =
  LoginSlice.actions;

export const loadUser = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      setAuthToken(token);
    }
    const res = await axios.get("/api/auth");
    console.log("User loaded", res.data);
    dispatch(setCurrentUser(res.data));
  } catch (err) {
    console.log(err);
  }
};

export const loginUser = (loginUser) => async (dispatch) => {
  try {
    const config = { headers: { "Content-Type": "application/json" } };
    const body = JSON.stringify(loginUser);
    const res = await axios.post("/api/auth", body, config);
    dispatch(loginSuccess());
    localStorage.setItem("token", res.data.token);
    setAuthToken(res.data.token);
    dispatch(loadUser());
  } catch (err) {
    dispatch(loginFailure(err.response.data));
  }
};

export const logoutUser = () => async (dispatch) => {
  try {
    localStorage.removeItem("token");
    setAuthToken(null);
    dispatch(logout());
  } catch (err) {
    console.error(err);
  }
};

// ... other thunks ...
// You can add more thunks for updating profile, creating posts, etc.

export default LoginSlice.reducer;
