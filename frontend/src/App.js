// src/main/frontend/src/App.js

import React, { useEffect, useState } from "react";
import axios from "axios";
import AllRoute from "./Route/AllRoute";
function App() {
  useEffect(() => {
    async function testApiCall() {
      try {
        const res = await axios.get("api/user");
        console.log(res.data);
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
