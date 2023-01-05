import axios from "axios";
import React, { useEffect } from "react";
import { API_URL } from "../util/API_URL";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import { setCookie, deleteCookie } from "../util/cookie";
import jwt_decode from "jwt-decode";
import { setUser } from "../slice/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
const KakaoSocial = () => {
  let code = new URL(window.location.href).searchParams.get("code");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(API_URL + `/ouath/kakao?code=${code}`);
        console.log(res);
        if (res.data.code === 2) {
          setCookie("Kakao", res.data.data);
          navigate("/kakaoSignup");
        } else if (res.data.code === 1) {
          navigate("/");
          const jwtToken = res.data.data.accessToken;
          const refreshToken = res.data.data.refreshToken;
          const decoded = jwt_decode(jwtToken);
          dispatch(setUser(decoded));
          deleteCookie("jwtToken");
          deleteCookie("refreshToken");
          setCookie("jwtToken", jwtToken);
          setCookie("refreshToken", refreshToken);
        }
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);
  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <ClimbingBoxLoader color="#ffe8cc" loading size="30" />
      <h1>로딩즁...</h1>
    </div>
  );
};
export default KakaoSocial;
