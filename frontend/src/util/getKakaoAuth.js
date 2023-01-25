import axios from "axios";
import { API_URL } from "./API_URL";
export default async function getKakaoAuth(code) {
  const res = await axios.get(API_URL + `/ouath/kakao?code=${code}`);
  return res;
}
