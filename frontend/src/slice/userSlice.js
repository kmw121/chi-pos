import { createSlice } from "@reduxjs/toolkit";

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
});

export const { setUser, setUserInfo } = userSlice.actions;
export default userSlice.reducer;
