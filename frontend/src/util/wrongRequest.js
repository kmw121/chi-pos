import { setCurrentPost, setUser } from "../slice/userSlice";
import { toast } from "react-toastify";
import deleteMultipleCookies from "./deleteMultipleCookies";

export default function wrongRequest(dispatch, navigate) {
  deleteMultipleCookies();
  dispatch(setUser([]));
  dispatch(setCurrentPost({}));
  toast.error("잘못된 요청입니다.");
  navigate("/");
}
