import { createSlice } from "@reduxjs/toolkit";

const countSlice = createSlice({
  name: "COUNT",
  initialState: {
    count: 0,
  },
  reducers: {
    incrementCount: (state, action) => {
      if (state.count < 10) {
        state.count += action.payload;
      }
    },
    decrementCount: (state, action) => {
      if (state.count > 0) {
        state.count -= action.payload;
      }
    },
    reset: state => {
      state.count = 0;
    },
    incrementByAmount: (state, action) => {
      state.count += action.payload;
    },
  },
});

export const { incrementCount, decrementCount, incrementByAmount, reset } =
  countSlice.actions;

export default countSlice.reducer;
