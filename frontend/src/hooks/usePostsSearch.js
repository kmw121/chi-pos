import axios from "axios";
import { useEffect, useState } from "react";
import { API_URL } from "../util/API_URL";
export default function usePostsSearch(
  searchConfig,
  stack,
  isEnd,
  categoryType,
  page
) {
  const [list, setList] = useState([]);
  const [loadingStatus, setLoadingStatus] = useState(false);
  useEffect(() => {
    console.log("call usePostsSearch useEffect");
    async function fetchData() {
      try {
        setLoadingStatus(true);
        const res = await axios.post(API_URL + "/posts", searchConfig);
        if (res.data.code !== -1) {
          setList((prev) => prev.concat(res.data.data));
          setLoadingStatus(false);
        }
        console.log("useEffect searchConfig : ", searchConfig);
        console.log("res : ", res);
      } catch (err) {
        throw new Error(err);
      }
    }
    fetchData();
  }, [stack, isEnd, categoryType]);
  return { list, loadingStatus, setList, setLoadingStatus };
}
