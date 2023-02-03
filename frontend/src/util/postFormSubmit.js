import axios from "axios";
import { API_URL } from "./API_URL";
import { toast } from "react-toastify";
import { setEditingPost } from "../slice/userSlice";

export default async function postFormSubmit(
  submitForm,
  token,
  dispatch,
  navigate,
  setDataFormReg
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
    setDataFormReg(response.data.data);
    toast.error("빈 칸이 없도록 입력하신 정보를 확인해 주세요!");
  }
}
