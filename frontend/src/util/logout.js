import { setCurrentPost, setUser } from "../slice/userSlice";
import { toast } from "react-toastify";
import deleteMultipleCookies from "./deleteMultipleCookies";

export const logout = (dispatch, navigate) => {
  dispatch(setUser([]));
  document.cookie = "jwtToken=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/;";
  document.cookie =
    "refreshToken=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/;";
  deleteMultipleCookies();
  dispatch(setCurrentPost({}));
  toast.success("로그아웃되었습니다.");
  navigate("/");
};
