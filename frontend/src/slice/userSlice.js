import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../API_URL";

export const getPosts = createAsyncThunk("getPosts", async () => {
  const res = await axios.post(
    API_URL + "/posts",
    {
      size: 6,
      page: 1,
    },
    {
      headers: { "Content-Type": "application/json" },
    }
  );
  return res.data.data;
});

const initialState = {
  user: [],
  userInfo: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts = action.payload;
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { setUser, setUserInfo } = userSlice.actions;
export default userSlice.reducer;
