import axios from "axios";
import { API_URL } from "./API_URL";
import settingAuthCookies from "./settingAuthCookies";
import jwt_decode from "jwt-decode";
import { fetchUser } from "../slice/userSlice";
import { toast } from "react-toastify";

export default async function postLogin(loginForm, dispatch, onToggle) {
  const res = await axios.post(API_URL + "/login", loginForm);
  const isLoginSuccess = res.data.code === 1;
  const isLoginFail = res.data.code === -1;
  if (isLoginSuccess) {
    const { accessToken, refreshToken } = res.data.data;
    settingAuthCookies(accessToken, refreshToken);
    const decoded = jwt_decode(accessToken);
    dispatch(fetchUser(decoded));
    onToggle();
    toast.success(`${loginForm.username}님 반갑습니다!`);
    return;
  }
  if (isLoginFail) {
    toast.error("id/pw를 확인해주세요.");
    return;
  }
}
