import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import request from "../../helpers/request";

const apiHost = process.env.REACT_APP_API_HOST;

export const signIn = createAsyncThunk(
  "signInOutSlice/signIn",
  async requestBody => {
    try {
      const response = await request(
        `${apiHost}/user/sign-in`,
        "POST",
        requestBody
      );

      localStorage.setItem("token", response.jwt);
      localStorage.setItem("refreshToken", response.refreshToken);

      return response;
    } catch (error) {
      throw error;
    }
  }
);
export const signOut = createAsyncThunk(
  "signInOutSlice/signOut",
  async token => {
    try {
      const response = await request(`${apiHost}/user/sign-out`, "POST", {
        jwt: token,
      });
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");

      return response;
    } catch (error) {
      throw error;
    }
  }
);

const signInOutSlice = createSlice({
  name: "signInOut",
  initialState: {
    token: null,
    status: "",
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(signIn.fulfilled, (state, action) => {
        state.token = action.payload.jwt;
        state.status = "success";
      })
      .addCase(signIn.rejected, (state, action) => {
        state.status = action.error.message;
      });
  },
});

export default signInOutSlice.reducer;
