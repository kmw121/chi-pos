import { deleteCookie } from "./cookie";
import { setUser, setUserInfo } from "../slice/userSlice";
export const logout = (dispatch, navigate) => {
  document.cookie = 'jwtToken=; expires=Thu, 01 Jan 1970 00:00:01 GMT; domain=3.39.164.180:8080; path=/;';
  document.cookie = 'refreshToken=; expires=Thu, 01 Jan 1970 00:00:01 GMT; domain=3.39.164.180:8080; path=/;';
  deleteCookie("jwtToken");
  deleteCookie("refreshToken");

  dispatch(setUserInfo([]));
  dispatch(setUser([]));
  alert("로그아웃되었습니다.");
  navigate("/");
  deleteCookie("jwtToken");
  deleteCookie("refreshToken");
  document.cookie = 'jwtToken=; expires=Thu, 01 Jan 1970 00:00:01 GMT; domain=3.39.164.180:8080; path=/;';
  document.cookie = 'refreshToken=; expires=Thu, 01 Jan 1970 00:00:01 GMT; domain=3.39.164.180:8080; path=/;';
  dispatch(setUserInfo([]));
  dispatch(setUser([]));
  window.location.reload();
  deleteCookie("jwtToken");
  deleteCookie("refreshToken");
  document.cookie = 'jwtToken=; expires=Thu, 01 Jan 1970 00:00:01 GMT; domain=3.39.164.180:8080; path=/;';
  document.cookie = 'refreshToken=; expires=Thu, 01 Jan 1970 00:00:01 GMT; domain=3.39.164.180:8080; path=/;';
  dispatch(setUserInfo([]));
  dispatch(setUser([]));
};
