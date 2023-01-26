import { deleteCookie } from "./cookie";
import { setCurrentPost, fetchUser } from "../slice/userSlice";
import { toast } from "react-toastify";

export const logout = (dispatch, navigate) => {
  navigate("/");
  document.cookie = "jwtToken=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/;";
  document.cookie =
    "refreshToken=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/;";
  deleteCookie("jwtToken");
  deleteCookie("refreshToken");
  dispatch(setCurrentPost({}));
  dispatch(fetchUser(""));
  toast.error("로그아웃되었습니다.");
  navigate("/");
};
