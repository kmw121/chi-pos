import axios from "axios";
import { API_URL } from "./API_URL";
export default async function postLogin(loginForm) {
  const res = await axios.post(API_URL + "/login", loginForm);
  return res;
}
