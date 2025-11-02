// Import
import { createSlice } from "@reduxjs/toolkit";

// state
const initialState = {
  mode: "dark",
  userId: "63701cc1f03239b7f700000e",
};

// slice
export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
  },
});

// actions and reducer
export const { setMode } = globalSlice.actions;

export default globalSlice.reducer;