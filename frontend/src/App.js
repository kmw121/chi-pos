// src/main/frontend/src/App.js

import React, { useEffect, useState } from "react";
import axios from "axios";
import AllRoute from "./Route/AllRoute";
import { API_URL } from "./API_URL";
import { useCookies } from "react-cookie";
import { deleteCookie, getCookie } from "./cookie";
import { logout } from "./util/logout";
import { useDispatch, useSelector } from "react-redux";
import { setUserInfo } from "./slice/userSlice";
function App() {
  const [login, setLogin] = useState(false);
  const [cookies, setCookie] = useCookies(["jwtToken"]);
  const { user, userInfo } = useSelector((state) => {
    return state.user;
  });
  const dispatch = useDispatch();
  console.log("user in redux : ", user);
  console.log("유저정보 인 리덕스 ", userInfo);
  useEffect(() => {
    async function testApiCall() {
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${cookies.accessToken}`;
      try {
        const res = await axios.get(API_URL + "/user/3", {
          headers: {
            Authorization: `${getCookie("jwtToken")}`,
          },
        });
        if (res.data.code === 2) {
          const nextRes = await axios.get(API_URL + "/user/3", {
            headers: { Authorization: `${getCookie("refreshToken")}` },
          });
          if (nextRes.data.data === 2 || nextRes.data.data === -1) {
            logout();
          } else if (nextRes.data.data !== -1) {
            console.log("expire res : ", nextRes);
            deleteCookie("jwtToken");
            setCookie("jwtToken", nextRes.data.data);
            console.log("ㅋ쿠키 최신화?");
          }
        }
        dispatch(setUserInfo(res.data));
        console.log(res);
        console.log("access : ", getCookie("jwtToken"));
        console.log("refresh : ", getCookie("refreshToken"));
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
