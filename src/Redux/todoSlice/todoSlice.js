import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import request from "../../helpers/request";
export const getTask = createAsyncThunk("todo/getTask", async () => {
  try {
    const response = await request("http://localhost:3001/task", "GET");
    return response;
  } catch (error) {
    throw error;
  }
});

const todoSlice = createSlice({
  name: "TODO",
  initialState: {
    data: [],
    status: "",
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getTask.pending, (state, action) => {
        state.status = "pending";
        return state;
      })
      .addCase(getTask.fulfilled, (state, action) => {
        state.status = "success";
        state.data = action.payload;
        return state;
      })
      .addCase(getTask.rejected, (state, action) => {
        state.status = "failure";
        return state;
      });
  },
});

export default todoSlice.reducer;
