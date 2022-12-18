import { configureStore } from "@reduxjs/toolkit";
import spinerReducer from "./spinerReducer";
import userReducer from "./userReduce";
export const store = configureStore({
  reducer: { userReducer, spinerReducer },
});
