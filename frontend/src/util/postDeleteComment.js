import axios from "axios";
import { API_URL } from "./API_URL";

export default async function postDeleteComment(id, token) {
  const res = await axios.delete(API_URL + `/comment/${id}`, {
    headers: {
      Authorization: `${token}`,
    },
  });
  return res;
}
