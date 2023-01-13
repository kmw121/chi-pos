import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: [],
  userInfo: [],
  currentPost: {},
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
    setCurrentPost: (state, action) => {
      state.currentPost = action.payload;
    },
  },
});

export const { setUser, setUserInfo, setCurrentPost } = userSlice.actions;
export default userSlice.reducer;
