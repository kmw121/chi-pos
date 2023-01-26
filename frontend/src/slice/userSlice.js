import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../util/API_URL";
import { pending, fulfilled, rejected } from "../constant";
import getUserInfo from "../util/getUserInfo";
import { getCookie } from "../util/cookie";
const initialState = {
  user: [],
  currentPost: {},
  loading: "",
};

// 생각 : loginForm 에다 아이디 비번 치고 -> 서버로 post 보냄
// 생각 : post를 받은 서버에서 1을 보냄 -> 여기서 accessToken, refreshToken이 같이 옴.
// 생각 : 여기서 asyncThunk가 필요할듯?
// 생각 : 아 그럼 user랑 token을 파라미터로 받지 않고
// 생각 : decoded된 토큰만 받으면 되는거아님?
// 생각 : 아 user ? userInfo ? 왜 따로쓸까?
// 생각 : user에 id 있고, userInfo.data에도 id 있는데?
// 생각 : userInfo를 user에다가 넣자.
export const fetchUser = createAsyncThunk("user/fetchUser", async (decoded) => {
  const res = await axios.get(API_URL + `/user/${decoded.id}`, {
    headers: {
      Authorization: getCookie("jwtToken"),
    },
  });
  return res;
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCurrentPost: (state, action) => {
      state.currentPost = action.payload;
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
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = rejected;
      });
  },
});

export const { setCurrentPost } = userSlice.actions;
export default userSlice.reducer;
