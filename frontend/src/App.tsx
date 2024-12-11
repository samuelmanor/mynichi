import React from "react";
import { useEffect } from "react";
// import { Page } from "./components/Page";
// import { NavArrow } from "./components/NavArrow";
import { useDispatch } from "react-redux";
import { setCurrentPage } from "./reducers/PageReducer";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_PAGE, GET_PAGE_COUNT } from "./utils/queries";
import { Page } from "./components/Page";
import { NavArrow } from "./components/NavArrow";
// import { formatMonth } from "./utils/formatMonth";

function App() {
  const dispatch = useDispatch();

  const [getTodaysPage] = useMutation(ADD_PAGE, {
    refetchQueries: [{ query: GET_PAGE_COUNT }],
    onCompleted: (data) => {
      dispatch(setCurrentPage(data.addPage));
    },
  });

  useEffect(() => {
    getTodaysPage();
  }, [getTodaysPage]);

  return (
    <div>
      <NavArrow />
      <Page />
    </div>
  );
}

export default App;
