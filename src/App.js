import { useEffect } from "react";
import { Page } from "./components/Page";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage } from "./reducers/PageReducer";
import { addPage } from "./reducers/JournalReducer";
import { getFormattedDate } from "./utils/getFormattedDate";
import { getTodaysPage } from "./reducers/PageReducer";
import { gql, useQuery } from "@apollo/client";
import { FIND_PAGE, GET_PAGE_COUNT } from "./utils/queries";

const TEST_QUERY = gql`
  query {
    pageCount
  }
`;

function App() {
  const today = getFormattedDate();
  // const todaysPage = useQuery(FIND_PAGE, {
  //   variables: {
  //     month: today.month,
  //     dayNum: today.day.number,
  //     year: today.year,
  //   },
  // });

  // useEffect(() => {
  //   if (todaysPage.data) {
  //     console.log("todaysPage", todaysPage.data.findPage);
  //   }
  // }, [todaysPage]);
  const result = useQuery(GET_PAGE_COUNT);
  console.log(result);

  return (
    <div>
      <Page />
    </div>
  );
}

export default App;
