import axios from "axios";
import { API_URL } from "./API_URL";
import { setCookie } from "./cookie";
import jwt_decode from "jwt-decode";
import { toast } from "react-toastify";
import { fetchUser } from "../slice/userSlice";
import settingAuthCookies from "./settingAuthCookies";

export default async function handleGoogleAuth(response, dispatch, navigate) {
  const googleResponse = await axios.get(
    API_URL + `/ouath/google?code=${response.accessToken}`
  );
  console.log("googleResponse : ", googleResponse);
  const isGoogleResponseSuccess = googleResponse.data.code === 2;
  const isAlreadySignedUp = googleResponse.data.code === 1;
  if (isGoogleResponseSuccess) {
    setCookie("Google", googleResponse.data.data);
    navigate("/googleSignup");
    return;
  }
  if (isAlreadySignedUp) {
    const { accessToken, refreshToken } = googleResponse.data.data;
    const decoded = jwt_decode(accessToken);
    settingAuthCookies(accessToken, refreshToken, { path: "/" });
    dispatch(fetchUser(decoded));
    navigate("/");
    toast.success("구글로 로그인 되었습니다.");
    return;
  }
}
