import { API_URL } from "./API_URL";
import axios from "axios";

export default async function getWithdrawal(token) {
  const res = await axios.get(API_URL + "/withdrawal", {
    headers: { Authorization: `${token}` },
  });
  return res;
}
