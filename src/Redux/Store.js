import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./Reducers/Reducer1"


export default configureStore({
  reducer: {
   counter : counterSlice
  },
});
