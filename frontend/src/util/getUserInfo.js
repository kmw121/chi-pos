import axios from "axios";
import { API_URL } from "./API_URL";

export default async function getUserInfo(decoded, token) {
  const res = await axios.get(API_URL + `/user/${decoded.id}`, {
    headers: {
      Authorization: token,
    },
  });
  console.log("getUser res : ", res);
  return res;
}
