// import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { configureStore } from "@reduxjs/toolkit";
import PageReducer from "./PageReducer";
// import JournalReducer from "./JournalReducer";

// const reducer = combineReducers({
//   page: PageReducer,
//   journal: JournalReducer,
// });

// export default configureStore({ reducer });

export default configureStore({ reducer: PageReducer });
