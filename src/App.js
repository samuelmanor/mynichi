import { useEffect } from "react";
import { Page } from "./components/Page";
import { NavArrow } from "./components/NavArrow";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage, setPageCount } from "./reducers/PageReducer";
import { getFormattedDate } from "./utils/getFormattedDate";
import { gql, useMutation, useQuery } from "@apollo/client";
import {
  FIND_PAGE,
  ADD_PAGE,
  GET_PAGE_COUNT,
  GET_AVAILABLE_PAGES,
} from "./utils/queries";

function App() {
  const dispatch = useDispatch();

  const today = getFormattedDate();
  const [getTodaysPage, { result, data, loading }] = useMutation(ADD_PAGE, {
    refetchQueries: [{ query: GET_PAGE_COUNT, GET_AVAILABLE_PAGES }],
    variables: {
      month: today.month,
      dayName: today.day.name,
      dayNum: today.day.number,
      year: today.year,
    },
    onCompleted: (data) => {
      dispatch(setCurrentPage(data.addPage));
    },
  });

  // const getPageCount = useQuery(GET_PAGE_COUNT, {
  //   onCompleted: (data) => {
  //     console.log(data);
  //     dispatch(setPageCount(data.pageCount));
  //   },
  // });

  useEffect(() => {
    getTodaysPage();
  }, [getTodaysPage]);

  return (
    <div>
      <Page />
      <NavArrow />
    </div>
  );
}

export default App;
