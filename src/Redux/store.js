import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import countSlice from "./countSlice/countSlice";
import todoSlice from "./todoSlice/todoSlice";

const store = configureStore({
  reducer: {
    count: countSlice,
    todo: todoSlice,
  },
  // middleware: [logger],
});

export default store;
