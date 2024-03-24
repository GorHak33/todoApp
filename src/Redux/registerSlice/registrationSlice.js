import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import request from "../../helpers/request";
const apiHost = process.env.REACT_APP_API_HOST;

export const userRegistration = createAsyncThunk(
  "registration/registration",
  async requestBody => {
    try {
      const response = await request(`${apiHost}/user`, "POST", requestBody);
      return response;
    } catch (error) {
      throw error;
    }
  }
);

const registrationSlice = createSlice({
  name: "registration",
  initialState: {
    data: null,
    status: "",
  },
  reducer: {},
  extraReducers: builder => {
    builder.addCase(userRegistration.fulfilled, (state, action) => {
      state.status = "success";
      state.data = action.payload;
      return state;
    });
  },
});

export default registrationSlice.reducer;
