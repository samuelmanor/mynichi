import { createSlice } from "@reduxjs/toolkit";

export const pages = [
  {
    id: 1,
    date: {
      month: 11,
      day: {
        number: 11,
        name: "mon",
      },
      year: 2024,
    },
  },
  {
    id: 2,
    date: {
      month: 11,
      day: {
        number: 12,
        name: "tue",
      },
      year: 2024,
    },
  },
];

const journalSlice = createSlice({
  name: "journal",
  initialState: pages,
  reducers: {
    addPage(state, action) {
      state.pages.push({
        id: state.pages.length + 1,
        date: action.payload,
      });
    },
  },
});

export const { addPage } = journalSlice.actions;

export default journalSlice.reducer;
