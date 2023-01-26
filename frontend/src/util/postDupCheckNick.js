import axios from "axios";
import { API_URL } from "./API_URL";

export default async function postDupCheckNick(form) {
  const res = await axios.post(API_URL + "/dupUsername", {
    nickName: form.nickName,
  });
  return res;
}
