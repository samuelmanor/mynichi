import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: 0,
  date: {
    month: 0,
    day: {
      number: 0,
      name: "",
    },
    year: 0,
  },
};

const pageSlice = createSlice({
  name: "pages",
  initialState,
  reducers: {
    setCurrentPage(state, action) {
      console.log("setCurrentPage", action.payload);
      state.id = action.payload.id;
      state.date = action.payload.date;
    },
  },
});

export const { setCurrentPage } = pageSlice.actions;

export default pageSlice.reducer;
