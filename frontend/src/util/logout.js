import { setEditingPost, setUser } from "../slice/userSlice";
import { toast } from "react-toastify";
import deleteAuthCookies from "./deleteAuthCookies";

export const logout = (dispatch, navigate) => {
  dispatch(setUser([]));
  document.cookie = "jwtToken=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/;";
  document.cookie =
    "refreshToken=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/;";
  deleteAuthCookies();
  dispatch(setEditingPost({}));
  toast.success("로그아웃되었습니다.");
  navigate("/");
};
