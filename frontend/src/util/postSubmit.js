import axios from "axios";
import { API_URL } from "./API_URL";

export default async function postSubmit(formdata) {
  const res = await axios({
    method: "POST",
    url: API_URL + "/signup",
    mode: "cors",
    headers: { "Content-Type": "multipart/form-data" },
    data: formdata,
  });
  return res;
}
