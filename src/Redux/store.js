import { configureStore } from "@reduxjs/toolkit";

import todoSlice from "./todoSlice/todoSlice";
import singleTaskSlice from "./singleTaskSlice/singleTaskSlice";
import registrationSlice from "./registerSlice/registrationSlice";
import signInOutSlice from "./SignInOutSlice/signInOutSlice";

const store = configureStore({
  reducer: {
    todo: todoSlice,
    singleTask: singleTaskSlice,
    registration: registrationSlice,
    signInOut: signInOutSlice,
  },
});

export default store;
