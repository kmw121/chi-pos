import { setEditingPost, setUser } from "../slice/userSlice";
import { toast } from "react-toastify";
import deleteAuthCookies from "./deleteAuthCookies";
import { userInitialState } from "./userInitialState";

export default function wrongRequest(dispatch, navigate) {
  deleteAuthCookies();
  dispatch(setUser(userInitialState));
  dispatch(setEditingPost({}));
  toast.error("잘못된 요청입니다.");
  navigate("/");
}
