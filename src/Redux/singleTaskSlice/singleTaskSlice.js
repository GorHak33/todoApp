import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import request from "../../helpers/request";

export const getSingleTask = createAsyncThunk(
  "singleTask/getSingleTask",
  async taskId => {
    try {
      const response = await request(
        `http://localhost:3001/task/${taskId}`,
        "GET"
      );
      return response;
    } catch (error) {
      throw error;
    }
  }
);

export const deleteSingleTask = createAsyncThunk(
  "singleTask/deleteSingleTask",
  async taskId => {
    try {
      const response = await request(
        `http://localhost:3001/task/${taskId}`,
        "DELETE"
      );
      if (response.success) {
        return taskId;
      }
    } catch (error) {
      throw error;
    }
  }
);

export const saveSingleTaskEdit = createAsyncThunk(
  "singleTask/saveSingleTaskEdit",
  async ({ task, taskId }) => {
    try {
      await request(
        `http://localhost:3001/task/${taskId}`,
        "PUT",
        JSON.stringify(task)
      );

      return { task, taskId };
    } catch (error) {
      throw error;
    }
  }
);
const singleTaskSlice = createSlice({
  name: "singleTask",
  initialState: {
    data: null,
    status: "",
  },
  reducer: {},
  extraReducers: builder => {
    builder
      .addCase(getSingleTask.fulfilled, (state, action) => {
        state.status = "success";
        state.data = action.payload;
        return state;
      })
      .addCase(getSingleTask.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(deleteSingleTask.fulfilled, (state, action) => {
        const idToDelete = action.payload;
        const filtered = state.data.filter(task => task._id !== idToDelete);
        state.status = "success";
        state.data = [...filtered];
      })
      .addCase(deleteSingleTask.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(saveSingleTaskEdit.fulfilled, (state, action) => {
        const { taskId, task } = action.payload;
        state.data = {
          ...state.data,
          title: task.title,
          description: task.description,
          date: task.date,
        };
        state.status = "success";
      });
  },
});

export default singleTaskSlice.reducer;
