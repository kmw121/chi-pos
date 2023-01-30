import { setEditingPost, setUser } from "../slice/userSlice";
import { toast } from "react-toastify";
import deleteAuthCookies from "./deleteAuthCookies";

export default function wrongRequest(dispatch, navigate) {
  deleteAuthCookies();
  dispatch(setUser([]));
  dispatch(setEditingPost({}));
  toast.error("잘못된 요청입니다.");
  navigate("/");
}
