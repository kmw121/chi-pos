import axios from "axios";
import { API_URL } from "./API_URL";
import { toast } from "react-toastify";

export default async function postSubmit(formdata, navigate) {
  const res = await axios({
    method: "POST",
    url: API_URL + "/signup",
    mode: "cors",
    headers: { "Content-Type": "multipart/form-data" },
    data: formdata,
  });
  const isSignUpSuccess = res.data.code === 1;
  const isSignUpFail = res.data.code === -1;
  if (isSignUpSuccess) {
    toast.success("회원가입이 완료되었습니다.");
    navigate("/");
    return;
  }
  if (isSignUpFail) {
    toast.error("회원가입에 실패하였습니다.");
    navigate("/");
    return;
  }
}
