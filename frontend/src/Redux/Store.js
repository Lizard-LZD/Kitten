import { configureStore } from "@reduxjs/toolkit";
import RegisterSlice from "./Reducers/RegisterSlice";
import LoginSlice from "./Reducers/LoginSlice";
import PostSlice from "./Reducers/PostSlice";
import AdoptionSlice from "./Reducers/AdoptionSlice";
import KittenSlice from "./Reducers/KittenSlice"
import ProfileSlice from "./Reducers/ProfileSlice";


export default configureStore({
  reducer: {
   register: RegisterSlice,
   login: LoginSlice,
   post: PostSlice,
   adoption: AdoptionSlice,
   kitten: KittenSlice,
   profile: ProfileSlice
  },
});
