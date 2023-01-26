import axios from "axios";
import { API_URL } from "./API_URL";

export default async function postDelete(id, token) {
  const res = await axios.delete(API_URL + `/post/${id}`, {
    headers: {
      Authorization: `${token}`,
    },
  });
  return res;
}
