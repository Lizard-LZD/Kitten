import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./Reducers/Reducer1"


export default configureStore({
  reducer: {
   counter : counterReducer
  },
});
