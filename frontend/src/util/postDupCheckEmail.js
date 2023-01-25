import axios from "axios";
import { API_URL } from "./API_URL";
export default async function postDupCheckEmail(form) {
  const res = await axios.post(API_URL + "/dupUsername", {
    username: form.username,
  });
  return res;
}
