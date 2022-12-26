// src/main/frontend/src/App.js

import React, { useEffect, useState } from "react";
import axios from "axios";
import AllRoute from "./Route/AllRoute";
import { API_URL } from "./API_URL";
import { useCookies } from "react-cookie";
function App() {
  const [login, setLogin] = useState(false);
  const [cookies, setCookie] = useCookies(["jwtToken"]);
  useEffect(() => {
    async function testApiCall() {
      // axios.defaults.headers.common[
      //   "Authorization"
      // ] = `Bearer ${cookies.jwtToken.jwtToken.accessToken}`;
      try {
        const res = await axios.get(API_URL + "/user/3", {
          headers: cookies,
          //여기 오류 수정예정...
          //     withCredentials: true,
        });
        console.log(res);
        console.log("cookies : ", cookies);
      } catch (err) {
        throw new Error(err);
      }
    }
    testApiCall();
  }, []);
  // console.log(cookies.jwtToken.jwtToken.accessToken);
  //  console.log("app.js cookies : ", cookies.jwtToken.jwtToken.accessToken);
  return (
    <>
      <AllRoute login={login} setLogin={setLogin} />
    </>
  );
}

export default App;
