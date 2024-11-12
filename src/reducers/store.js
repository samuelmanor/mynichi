import { configureStore } from "@reduxjs/toolkit";

import pageReducer from "./PageReducer";

export default configureStore({
  reducer: pageReducer,
});
