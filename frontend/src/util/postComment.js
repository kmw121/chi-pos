import axios from "axios";
import { API_URL } from "./API_URL";

export default async function postComment(post, comment, token) {
  const res = await axios.post(
    API_URL + "/comment",
    { postId: post.id, detail: comment },
    {
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  return res;
}
