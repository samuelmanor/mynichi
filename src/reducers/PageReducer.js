import { createSlice } from "@reduxjs/toolkit";
import { getFormattedDate } from "../utils/getFormattedDate";
import { useQuery } from "@apollo/client";
import { FIND_PAGE } from "../utils/queries";

// const initialState = {
//   id: 0,
//   date: {
//     month: 0,
//     day: {
//       number: 0,
//       name: "",
//     },
//     year: 0,
//   },
// };

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
        month: 0,
        year: 0,
      },
    },
    pageCount: 1,
  },
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
