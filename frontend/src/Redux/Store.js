import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./Reducers/Reducer1"
import RegisterSlice from "./Reducers/RegisterSlice"


export default configureStore({
  reducer: {
   counter : counterSlice,
   register: RegisterSlice
  },
});
