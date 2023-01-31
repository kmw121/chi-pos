import axios from "axios";
import { API_URL } from "./API_URL";
import { toast } from "react-toastify";

export default async function postDupCheckNick(form, setFormReg) {
  const dupCheck = await axios.post(API_URL + "/dupUsername", {
    nickName: form.nickName,
  });
  const isDupCheckSuccess = dupCheck.data.code === -1;
  const isDupCheckFail = dupCheck.data.code === 1;
  if (isDupCheckSuccess) {
    setFormReg((prev) => {
      return { ...prev, dupCheckNickName: true };
    });
    toast.success("닉네임을 설정하셨습니다.");
    return;
  }
  if (isDupCheckFail) {
    toast.error("이미 존재하는 닉네임입니다.");
    return;
  }
}
