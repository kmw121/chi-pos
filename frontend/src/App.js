// src/main/frontend/src/App.js

import React, { useEffect, useState } from "react";
import axios from "axios";
import AllRoute from "./Route/AllRoute";
function App() {
  useEffect(() => {
    async function testApiCall() {
      try {
        const res = await axios.get("http://3.39.164.180:8080/user/33");
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    }
    testApiCall();
  }, []);
  return (
    <>
      <AllRoute />
    </>
  );
}

export default App;
