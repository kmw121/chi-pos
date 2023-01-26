import { setCurrentPost, fetchUser } from "../slice/userSlice";
import { deleteCookie } from "./cookie";
import { toast } from "react-toastify";

export default function wrongRequest(dispatch, navigate) {
  deleteCookie("jwtToken");
  deleteCookie("refreshToken");
  dispatch(setCurrentPost({}));
  dispatch(fetchUser(""));
  toast.error("잘못된 요청입니다.");
  navigate("/");
}
