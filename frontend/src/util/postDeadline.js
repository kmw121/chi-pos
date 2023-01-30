import axios from "axios";
import { API_URL } from "./API_URL";
import { toast } from "react-toastify";
import { setCurrentPost } from "../slice/userSlice";
import getCurrentPost from "./getCurrentPost";

export default async function postDeadline(id, getCookie, dispatch, navigate) {
  const deadlineRes = await axios.post(API_URL + `/end/${id}`, null, {
    headers: {
      Authorization: `${getCookie("jwtToken")}`,
    },
  });
  const isDeadlineSuccess = deadlineRes.data.code === 1;
  const isDeadlineFail = deadlineRes.data.code === -1;
  if (isDeadlineSuccess) {
    toast.success("마감되었습니다.");
    navigate("/");
    dispatch(setCurrentPost(await getCurrentPost(id)));
    return;
  }
  if (isDeadlineFail) {
    toast.error("알 수 없는 오류가 발생하였습니다.");
    return;
  }
}
