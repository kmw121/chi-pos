import { deleteCookie } from "./cookie";
import { setUser, setUserInfo } from "../slice/userSlice";
export const logout = (dispatch, navigate) => {
  deleteCookie(["jwtToken"]);
  deleteCookie(["refreshToken"]);
  deleteCookie(["jwtToken"]);
  deleteCookie(["refreshToken"]);
  deleteCookie(["jwtToken"]);
  deleteCookie(["refreshToken"]);
  deleteCookie(["jwtToken"]);
  deleteCookie(["refreshToken"]);
  deleteCookie("jwtToken");
  deleteCookie("refreshToken");
  dispatch(setUserInfo([]));
  dispatch(setUser([]));
  alert("로그아웃되었습니다.");
  navigate("/");
  window.location.reload();
};
