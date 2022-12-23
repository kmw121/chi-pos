// src/main/frontend/src/App.js

import React, { useEffect, useState } from "react";
import axios from "axios";
import AllRoute from "./Route/AllRoute";
import { API_URL } from "./API_URL";
function App() {
  const [login, setLogin] = useState(false);
  if (login) {
    setTimeout(() => {
      alert("세션이 만료되어 로그아웃 되었습니다.");
      localStorage.removeItem("access");
      setLogin(false);
    }, 5000);
  }
  useEffect(() => {
    async function testApiCall() {
      try {
        const res = await axios.get(API_URL + "/user/3");
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    }
    testApiCall();
  }, []);
  console.log("login : ", login);
  return (
    <>
      <AllRoute login={login} setLogin={setLogin} />
    </>
  );
}

export default App;
