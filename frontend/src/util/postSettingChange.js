import axios from "axios";
import { API_URL } from "./API_URL";

export default async function postSettingChange(formdata, token) {
  const res = await axios({
    method: "POST",
    url: API_URL + "/changeInfo",
    mode: "cors",
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: token,
    },
    data: formdata,
  });
  return res;
}
