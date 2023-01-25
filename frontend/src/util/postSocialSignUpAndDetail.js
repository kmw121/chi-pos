import axios from "axios";
import { API_URL } from "./API_URL";
export default async function postSocialSignUpAndDetail(
  formdata,
  address,
  token
) {
  const res = await axios({
    method: "POST",
    url: API_URL + address,
    mode: "cors",
    headers: { "Content-Type": "multipart/form-data", Authorization: token },
    data: formdata,
  });
  return res;
}
