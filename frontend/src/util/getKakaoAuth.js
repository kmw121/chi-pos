import axios from "axios";
import { API_URL } from "./API_URL";
import { setCookie } from "./cookie";
import settingAuthCookies from "./settingAuthCookies";
import jwt_decode from "jwt-decode";
import { fetchUser } from "../slice/userSlice";
import { toast } from "react-toastify";

export default async function getKakaoAuth(code, dispatch, navigate) {
  const kakaoAuth = await axios.get(API_URL + `/ouath/kakao?code=${code}`);
  const isAlreadySignedUp = kakaoAuth.data.code === 1;
  const isKakaoAuthSuccess = kakaoAuth.data.code === 2;
  const isNotAuth = kakaoAuth.data.code === -1;
  if (isKakaoAuthSuccess) {
    setCookie("Kakao", kakaoAuth.data.data);
    navigate("/kakaoSignup");
    return;
  }
  if (isNotAuth) {
    navigate("/");
    toast.error("권한이 없습니다.");
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
}
