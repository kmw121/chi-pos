import axios from "axios";
import { API_URL } from "./API_URL";

export default async function getCurrentPost(id) {
  const res = await axios.get(API_URL + `/post/${id}`);
  console.log(res.data.data);
  return res.data.data;
}
