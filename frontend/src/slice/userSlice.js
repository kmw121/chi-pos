import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../util/API_URL";
import { pending, fulfilled, rejected } from "../constant";
import { getCookie } from "../util/cookie";

const initialState = {
  user: {
    code: "",
    message: "",
    data: {
      id: "",
      nickName: "",
      userStack: [],
      username: "",
      imageUrl: "",
    },
  },
  currentPost: {
    user: {
      imageUrl: "",
      nickName: "",
      id: "",
    },
    createdDate: "11111",
    startDate: "11111",
    postStack: [],
    comments: [],
  },
  editingPost: {},
};

export const fetchUser = createAsyncThunk("user/fetchUser", async (decoded) => {
  const res = await axios.get(API_URL + `/user/${decoded.id}`, {
    headers: {
      Authorization: getCookie("jwtToken"),
    },
  });
  return res.data;
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCurrentPost: (state, action) => {
      state.currentPost = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setEditingPost: (state, action) => {
      state.editingPost = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = pending;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = fulfilled;
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state) => {
        state.loading = rejected;
      });
  },
});

export const { setCurrentPost, setUser, setEditingPost } = userSlice.actions;
export default userSlice.reducer;
