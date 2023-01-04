import axios from "axios";
import { useEffect, useState } from "react";
import { API_URL } from "../util/API_URL";
export default function usePostsSearch(searchConfig) {
  const [list, setList] = useState([]);
  const [loadingStatus, setLoadingStatus] = useState(false);
  console.log("list : ", list);
  useEffect(() => {
    async function fetchData() {
      try {
        setLoadingStatus(true);
        const res = await axios.post(API_URL + "/posts", searchConfig);
        setList((prev) => prev.concat(res.data.data));
        setLoadingStatus(false);
      } catch (err) {
        throw new Error(err);
      }
    }
    fetchData();
  }, [searchConfig]);
  return { list, loadingStatus };
}
