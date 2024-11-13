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
    // setDate(state, action) {
    //   state.date = action.payload;
    // },
  },
});

export const { setCurrentPage } = pageSlice.actions;

// export const getDate = () => {
//   return (dispatch) => {
//     const date = new Date();
//     // if day matches today, don't dispatch (i.e. don't create a new page)
//     dispatch(
//       setDate({
//         year: date.getFullYear(),
//         month: date.getMonth() + 1,
//         day: {
//           number: date.getDate(),
//           name: date.toDateString().split(" ")[0].toLowerCase(),
//         },
//       })
//     );
//   };
// };

export default pageSlice.reducer;
