// src/main/frontend/src/App.js

import React, { useEffect } from "react";
import axios from "axios";
import AllRoute from "./Route/AllRoute";
import { API_URL } from "./API_URL";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "./slice/userSlice";
import usePostsSearch from "./hooks/usePostsSearch";
function App() {
  const { user, posts, isLoading, error } = useSelector((state) => {
    return state.user;
  });
  const dispatch = useDispatch();
  const { list, loadingStatus } = usePostsSearch();
  useEffect(() => {
    dispatch(getPosts());
  }, []);
  usePostsSearch();
  return (
    <>
      <AllRoute />
    </>
  );
}

export default App;
