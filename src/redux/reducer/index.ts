import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userReduce";
export const store = configureStore({
  reducer: {userReducer},
});
