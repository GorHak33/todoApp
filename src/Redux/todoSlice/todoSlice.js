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

export const addTask = createAsyncThunk("todo/addTask", async task => {
  try {
    const response = await request(
      "http://localhost:3001/task",
      "POST",
      JSON.stringify(task)
    );
    return response;
  } catch (error) {
    throw error;
  }
});

export const deleteTask = createAsyncThunk("todo/deleteTask", async _id => {
  try {
    const response = await request(
      `http://localhost:3001/task/${_id}`,
      "DELETE"
    );
    if (response.success) {
      return _id;
    }
  } catch (error) {
    throw error;
  }
});

export const deleteTasks = createAsyncThunk("todo/deleteTasks", async tasks => {
  try {
    await request("http://localhost:3001/task", "PATCH", { tasks });
    return tasks;
  } catch (error) {
    console.log(tasks);
    throw new Error();
  }
});

export const editTask = createAsyncThunk(
  "todo/editTask",
  async ({ _id, values }) => {
    try {
      await request(
        `http://localhost:3001/task/${_id}`,
        "PUT",
        JSON.stringify(values)
      );
      return { _id, values };
    } catch (error) {
      throw error;
    }
  }
);

const todoSlice = createSlice({
  name: "TODO",
  initialState: {
    data: [],
    status: "",
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(addTask.fulfilled, (state, action) => {
        const newTask = action.payload;
        state.status = "success";
        state.data = [...state.data, newTask];
        return state;
      })
      .addCase(getTask.fulfilled, (state, action) => {
        state.status = "success";
        state.data = action.payload;
        return state;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        const idToDelete = action.payload;
        const filtered = state.data.filter(task => task._id !== idToDelete);
        state.data = [...filtered];
      })

      .addCase(deleteTasks.fulfilled, (state, action) => {
        const idsToDelete = new Set(action.payload);
        const newTasks = state.data.filter(task => {
          if (idsToDelete.has(task._id)) {
            return false;
          } else {
            return true;
          }
        });
        console.log(idsToDelete);
        state.data = [...newTasks];
      })
      .addCase(editTask.fulfilled, (state, action) => {
        const { _id, values } = action.payload;
        state.data = state.data.map(task => {
          if (task._id === _id) {
            return {
              ...task,
              title: values.title,
              description: values.description,
              date: values.date,
            };
          }
          return task;
        });
        state.status = "success";
      })

      .addCase(getTask.rejected, (state, action) => {
        state.status = "failure";
        return state;
      });
  },
});

export default todoSlice.reducer;
