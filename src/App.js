import logo from "./logo.svg";
import "./App.css";
import { CalDisplay } from "./components/CalDisplay";
import { getDate } from "./reducers/PageReducer";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDate());
  }, []);

  return (
    <div className="App">
      <CalDisplay />
    </div>
  );
}

export default App;
