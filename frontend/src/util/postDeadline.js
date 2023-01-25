import axios from "axios";
import { API_URL } from "./API_URL";
export default async function postDeadline(id, getCookie) {
  const res = await axios.post(API_URL + `/end/${id}`, null, {
    headers: {
      Authorization: `${getCookie("jwtToken")}`,
    },
  });
  return res;
}
