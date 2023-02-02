import axios from "axios";
import { API_URL } from "./API_URL";
import settingAuthCookies from "./settingAuthCookies";
import jwt_decode from "jwt-decode";
import { fetchUser } from "../slice/userSlice";
import { toast } from "react-toastify";

export default async function postLogin(
  loginForm,
  dispatch,
  navigate,
  isNotTest,
  onToggle,
  setLoginFormReg
) {
  const res = await axios.post(API_URL + "/login", loginForm);
  const isLoginSuccess = res.data.code === 1;
  const isLoginFail = res.data.code === -1;
  if (isLoginSuccess) {
    const { accessToken, refreshToken } = res.data.data;
    settingAuthCookies(accessToken, refreshToken);
    const decoded = jwt_decode(accessToken);
    dispatch(fetchUser(decoded));
    isNotTest && onToggle();
    navigate("/");
    !isNotTest && toast.success("테스트 계정으로 로그인 하였습니다.");
    isNotTest && toast.success(`${loginForm.username}님 반갑습니다!`);
    return;
  }
  if (isLoginFail) {
    const isNotExist = res.data.message === "존재하지 않는 회원입니다.";
    const isNotValid = res.data.message === "아이디 비밀번호가 맞지 않습니다.";
    if (isNotTest && isNotExist) {
      setLoginFormReg({ username: res.data.message });
    }
    if (isNotTest && isNotValid) {
      setLoginFormReg({ password: res.data.message });
    }
    toast.error("id/pw를 확인해주세요!");
  }
}
