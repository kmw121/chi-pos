import axios from "axios";
import { API_URL } from "./API_URL";
export default async function getIncreaseView(id) {
  const res = await axios.get(API_URL + `/post/view/${id}`);
  return res;
}
