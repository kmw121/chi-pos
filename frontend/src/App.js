// src/main/frontend/src/App.js

import React, { useEffect } from "react";
import axios from "axios";
import AllRoute from "./Route/AllRoute";
import { API_URL } from "./API_URL";
import { useSelector } from "react-redux";
function App() {
  const { user } = useSelector((state) => {
    return state.user;
  });
  console.log("user id in redux: ", user.id);
  useEffect(() => {
    async function helloWorld() {
      try {
        const res = await axios.get(API_URL + "/posts");
        console.log("글 정보", res);
      } catch (err) {
        throw new Error(err);
      }
    }
    helloWorld();
  }, []);
  return (
    <>
      <AllRoute />
    </>
  );
}

export default App;
