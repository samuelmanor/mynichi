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
    // getTodaysPage(state, action) {
    //   // console.log("getTodaysPage", action.payload);
    //   // state.currentPage = action.payload;
    // },
    setCurrentPage(state, action) {
      console.log("setCurrentPage", action.payload);
      state.id = action.payload.id;
      state.date = action.payload.date;
    },
    addPage(state, action) {
      state.currentPage = {
        id: state.pageCount + 1,
        date: action.payload,
      };
    },
  },
});

export const { setCurrentPage } = pageSlice.actions;

export const getTodaysPage = (today) => {
  return (dispatch) => {
    console.log(today);
    // const today = getFormattedDate();
    // console.log(today);
    // const page = state.pages.find((page) => {
    //   return (
    //     page.date.year === today.year &&
    //     page.date.month === today.month &&
    //     page.date.day.number === today.day.number
    //   );
    // });
    // if (page) {
    //   // if there is a page for today, set it as the current page
    //   dispatch(setCurrentPage(page));
    // } else {
    //   // if there is no page for today, create a new page
    //   dispatch(addPage(today));
    // }
  };
};

export default pageSlice.reducer;
