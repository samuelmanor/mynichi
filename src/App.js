import { useEffect } from "react";
import { Page } from "./components/Page";

function App() {
  useEffect(() => {
    // get current date
    // load page that matches date
  }, []);

  return (
    <div>
      <Page />
    </div>
  );
}

export default App;
