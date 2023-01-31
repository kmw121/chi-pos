import axios from "axios";
import { API_URL } from "./API_URL";
import { toast } from "react-toastify";
import { setEditingPost } from "../slice/userSlice";

export default async function postFormSubmit(
  submitForm,
  token,
  dispatch,
  navigate
) {
  const response = await axios.post(API_URL + "/post", submitForm, {
    headers: { Authorization: token },
  });
  const isRegisterSuccess = response.data.code === 1;
  const isRegisterFail = response.data.code === -1;
  if (isRegisterSuccess) {
    dispatch(setEditingPost({}));
    toast.success("등록이 완료되었습니다.");
    navigate("/");
  } else if (isRegisterFail) {
    dispatch(setEditingPost({}));
    toast.error("알 수 없는 오류로 등록에 실패하였습니다.");
    navigate("/");
  }
}
