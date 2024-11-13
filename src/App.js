import { useEffect } from "react";
import { Page } from "./components/Page";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage } from "./reducers/PageReducer";
import { addPage } from "./reducers/JournalReducer";
import { getFormattedDate } from "./utils/getFormattedDate";

function App() {
  const pages = useSelector((state) => state.journal.pages);

  const dispatch = useDispatch();

  useEffect(() => {
    if (pages) {
      // get today's date
      const today = getFormattedDate();

      // check if there is a page for today
      const page = pages.find(
        (page) =>
          page.date.year === today.year &&
          page.date.month === today.month &&
          page.date.day.number === today.day.number
      );

      if (page) {
        // if there is a page for today, set it as the current page
        dispatch(setCurrentPage(page));
      } else {
        // if there is no page for today, create a new page
        dispatch(addPage(today));
      }
    }
  }, [dispatch, pages]);

  return (
    <div>
      <Page />
    </div>
  );
}

export default App;
