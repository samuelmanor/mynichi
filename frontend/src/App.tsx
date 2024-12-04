import React from "react";
import { useEffect } from "react";
// import { Page } from "./components/Page";
// import { NavArrow } from "./components/NavArrow";
import { useDispatch } from "react-redux";
// @ts-ignore
import { setCurrentPage } from "./reducers/PageReducer";
import { useMutation, useQuery } from "@apollo/client";
// @ts-ignore
import { ADD_PAGE, GET_PAGE_COUNT } from "./utils/queries";
import { Page } from "./components/Page";
// import { formatMonth } from "./utils/formatMonth";

function App() {
  const dispatch = useDispatch();

  // const [getTodaysPage] = useMutation(ADD_PAGE, {
  //   refetchQueries: [{ query: GET_PAGE_COUNT }],
  //   onCompleted: (data) => {
  //     dispatch(setCurrentPage(data.addPage));
  //   },
  // });

  const getPageCount = useQuery(GET_PAGE_COUNT, {
    onCompleted: (data) => {
      console.log(data);
    },
  });

  useEffect(() => {
    console.log(getPageCount);
  }, [getPageCount]);

  // useEffect(() => {
  //   getTodaysPage();
  // }, [getTodaysPage]);

  return (
    <div>
      {/* <Page />
      <NavArrow /> */}
      <Page />
    </div>
  );
}

export default App;
