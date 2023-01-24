import axios from "axios";
import { useEffect, useState } from "react";
import { API_URL } from "../util/API_URL";
export default function usePostsSearch() {
  const [list, setList] = useState([]);
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [searchConfig, setSearchConfig] = useState({
    page: 1,
    stack: [],
    size: 6,
    isEnd: true,
    categoryType: "",
  });
  const [isEnd, setIsEnd] = useState(false);
  useEffect(() => {
    async function fetchData() {
      try {
        setLoadingStatus(true);
        const res = await axios.post(API_URL + "/posts", searchConfig);
        if (res.data.code === 1) {
          setList(() => list.concat(res.data.data));
          setLoadingStatus(false);
        } else if (res.data.code === -1) {
          setLoadingStatus(false);
          setIsEnd(true);
        }
      } catch (err) {
        throw new Error(err);
      }
    }
    fetchData();
  }, [searchConfig]);
  return {
    list,
    setList,
    searchConfig,
    setSearchConfig,
    loadingStatus,
    setLoadingStatus,
    isEnd,
    setIsEnd,
  };
}
