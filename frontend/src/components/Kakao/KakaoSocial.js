import React, { useEffect } from "react";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import { setCookie } from "../../util/cookie";
import jwt_decode from "jwt-decode";
import { fetchUser } from "../../slice/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { KakaoSocialBox } from "../Google/socialButton";
import getKakaoAuth from "../../util/getKakaoAuth";
import settingAuthCookies from "../../util/settingAuthCookies";
import { toast } from "react-toastify";

function KakaoSocial() {
  let code = new URL(window.location.href).searchParams.get("code");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchData() {
      try {
        const kakaoAuth = await getKakaoAuth(code);
        const isAlreadySignedUp = kakaoAuth.data.code === 1;
        const isKakaoAuthSuccess = kakaoAuth.data.code === 2;
        if (isKakaoAuthSuccess) {
          setCookie("Kakao", kakaoAuth.data.data);
          navigate("/kakaoSignup");
          return;
        }
        if (isAlreadySignedUp) {
          const { accessToken, refreshToken } = kakaoAuth.data.data;
          settingAuthCookies(accessToken, refreshToken, {
            path: "/",
            domain: "chi-pos.com",
          });
          const decoded = jwt_decode(accessToken);
          dispatch(fetchUser(decoded));
          navigate("/");
          return;
        }
      } catch (err) {
        toast.error(err);
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
}
export default KakaoSocial;
