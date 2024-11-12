import { createSlice } from "@reduxjs/toolkit";

const journalSlice = createSlice({
  name: "journal",
  initialState: {
    pages: [
      {
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
});

export default journalSlice.reducer;
