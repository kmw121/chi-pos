import axios from "axios";
import { API_URL } from "./API_URL";

export default async function postFormSubmit(submitForm, token) {
  const res = await axios.post(API_URL + "/post", submitForm, {
    headers: { Authorization: token },
  });
  return res;
}
