import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  date: {
    month: 0,
    day: 0,
    year: 0,
  },
};

const pageSlice = createSlice({
  name: "pages",
  initialState,
  reducers: {
    setDate(state, action) {
      // state.date = action.payload;
      console.log(action.payload);
    },
  },
});

export default pageSlice.reducer;
