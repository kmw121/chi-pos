import axios from "axios";
import { API_URL } from "./API_URL";
import { toast } from "react-toastify";

export default async function postDupCheckEmail(form, setFormReg) {
  const dupCheck = await axios.post(API_URL + "/dupUsername", {
    username: form.username,
  });
  const isDupCheckSuccess = dupCheck.data.code === -1;
  const isDupCheckFail = dupCheck.data.code === 1;
  if (isDupCheckSuccess) {
    setFormReg((prev) => {
      return { ...prev, dupCheckUsername: true };
    });
    toast.success("이메일을 설정하셨습니다.");
    return;
  }
  if (isDupCheckFail) {
    toast.error("이미 존재하는 이메일입니다.");
    return;
  }
}
