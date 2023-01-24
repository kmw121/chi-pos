import { deleteCookie } from "./cookie";
import { setUser, setUserInfo, setCurrentPost } from "../slice/userSlice";
export const logout = (dispatch, navigate) => {
  navigate("/");
  document.cookie = "jwtToken=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/;";
  document.cookie = "refreshToken=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/;";
  deleteCookie("jwtToken");
  deleteCookie("refreshToken");
  dispatch(setUserInfo([]));
  dispatch(setUser([]));
  dispatch(setCurrentPost({}));
  alert("로그아웃되었습니다.");
  navigate("/");
  window.location.reload();
};
