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
  // useEffect(() => {
  //   async function helloWorld() {
  //     try {
  //       const res = await axios.get(API_URL + "/posts");
  //       console.log("글 정보", res);
  //     } catch (err) {
  //       throw new Error(err);
  //     }
  //   }
  //   helloWorld();
  // }, []);
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
