import axios from "axios";
import { useState } from "react";
import { API_URL } from "../API_URL";
import usePostsSearch from "./usePostsSearch";
//여기 오류 수정...ㅠㅠ
export default async function useGetPostsById(id) {
  try {
    const res = await axios.get(API_URL + "/posts/all");
    const [list, setList] = useState(res.data.data);
    const post = setList(list.filter((data) => String(data.id) === id));
    console.log("post : ", post);
    return post[0];
  } catch (err) {
    throw new Error(err);
  }
}
