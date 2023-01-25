import {
  setCurrentPost,
  setIsLogin,
  setUser,
  setUserInfo,
} from "../slice/userSlice";
import { deleteCookie } from "./cookie";
export default function wrongRequest(dispatch, navigate) {
  deleteCookie("jwtToken");
  deleteCookie("refreshToken");
  dispatch(setCurrentPost({}));
  dispatch(setUser([]));
  dispatch(setUserInfo([]));
  dispatch(setIsLogin(false));
  alert("잘못된 요청입니다.");
  navigate("/");
}
