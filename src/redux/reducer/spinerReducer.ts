import { createSlice } from "@reduxjs/toolkit";

const spinerReducer = createSlice({
  name: "spiner",
  initialState: { isLoading: false },
  reducers: {
    setOn: (state) => {
      state.isLoading = true;
    },
    setOff: (state) => {
      state.isLoading = false;
    },
  },
});
export const { setOn, setOff } = spinerReducer.actions;
export default spinerReducer.reducer;
