import { createSlice } from "@reduxjs/toolkit";

const journalSlice = createSlice({
  name: "journal",
  initialState: {
    pages: [
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
    ],
  },
  reducers: {},
});

export const {} = journalSlice.actions;

export default journalSlice.reducer;
