import axios from "axios";
import React, { useEffect } from "react";
import { API_URL } from "../../util/API_URL";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import { setCookie, deleteCookie } from "../../util/cookie";
import jwt_decode from "jwt-decode";
import { setUser, setUserInfo } from "../../slice/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { KakaoSocialBox } from "../components";
const KakaoSocial = () => {
  let code = new URL(window.location.href).searchParams.get("code");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(API_URL + `/ouath/kakao?code=${code}`);
        if (res.data.code === 2) {
          setCookie("Kakao", res.data.data);
          navigate("/kakaoSignup");
        } else if (res.data.code === 1) {
          const jwtToken = res.data.data.accessToken;
          const refreshToken = res.data.data.refreshToken;
          const decoded = jwt_decode(jwtToken);
          dispatch(setUser(decoded));
          const nextRes = await axios.get(API_URL + `/user/${decoded.id}`, {
            headers: {
              Authorization: jwtToken,
            },
          });
          dispatch(setUserInfo(nextRes.data));
          navigate("/");
          deleteCookie("jwtToken");
          deleteCookie("refreshToken");
          setCookie("jwtToken", jwtToken, { path: "/", domain: "chi-pos.com" });
          setCookie("refreshToken", refreshToken, {
            path: "/",
            domain: "chi-pos.com",
          });
          // document.cookie = "jwtToken" + " = " + jwtToken + "; path=/; ";
          // console.log("토큰생성1");
          // document.cookie =
          //   "refreshToken" + " = " + refreshToken + "; path=/; ";
          // console.log("토큰생성2");
        }
      } catch (err) {
        throw new Error(err);
      }
    }
    fetchData();
  }, []);
  return (
    <KakaoSocialBox>
      <ClimbingBoxLoader color="#ffe8cc" loading size="30" />
      <h1>잠시만 기다려 주세요</h1>
    </KakaoSocialBox>
  );
};
export default KakaoSocial;
