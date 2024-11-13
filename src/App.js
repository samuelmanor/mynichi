import { useEffect } from "react";
import { Page } from "./components/Page";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage } from "./reducers/PageReducer";

function App() {
  const pages = useSelector((state) => state.journal.pages);

  const dispatch = useDispatch();

  useEffect(() => {
    // get current date
    const today = new Date();

    // load page that matches date
    const page = pages.find(
      (page) =>
        page.date.year === today.getFullYear() &&
        page.date.month === today.getMonth() + 1 &&
        page.date.day.number === today.getDate()
    );

    dispatch(setCurrentPage(page));

    // if page doesn't exist, create new page
  }, []);

  return (
    <div>
      <Page />
    </div>
  );
}

export default App;
