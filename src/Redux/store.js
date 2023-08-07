import { configureStore } from "@reduxjs/toolkit";

import todoSlice from "./todoSlice/todoSlice";
import singleTaskSlice from "./singleTaskSlice/singleTaskSlice";

const store = configureStore({
  reducer: {
    todo: todoSlice,
    singleTask: singleTaskSlice,
  },
});

export default store;
