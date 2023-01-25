import axios from "axios";
import { API_URL } from "./API_URL";

export default async function handleGoogleAuth(response) {
  const res = await axios.get(
    API_URL`/ouath/google?code=${response.accessToken}`
  );
  return res;
}
