import { createSlice } from "@reduxjs/toolkit";

const pageSlice = createSlice({
  name: "pages",
  initialState: {
    currentPage: {
      id: 0,
      date: {
        day: {
          name: "",
          number: 0,
        },
        week: 0,
        month: 0,
        year: 0,
      },
    },
    pageCount: 0,
  },
  reducers: {
    setCurrentPage(state, action) {
      console.log("setCurrentPage", action.payload);
      state.currentPage.id = action.payload.id;
      state.currentPage.date = {
        day: {
          name: action.payload.date.day.name,
          number: action.payload.date.day.number,
        },
        week: action.payload.date.week,
        month: action.payload.date.month,
        year: action.payload.date.year,
      };
    },
    setPageCount(state, action) {
      state.pageCount = action.payload;
    },
  },
});

export const { setCurrentPage, setPageCount } = pageSlice.actions;

export default pageSlice.reducer;
