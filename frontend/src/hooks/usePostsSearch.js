import axios from "axios";
import { useEffect, useState } from "react";
import { API_URL } from "../util/API_URL";
export default function usePostsSearch(hello) {
  const [list, setList] = useState([]);
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [searchConfig, setSearchConfig] = useState({
    page: 1,
    stack: [],
    size: 6,
    isEnd: true,
    categoryType: "",
  });
  useEffect(() => {
    async function fetchData() {
      console.log("useEffect 호출");
      try {
        setLoadingStatus(true);
        const res = await axios.post(API_URL + "/posts", searchConfig);
        if (res.data.code !== -1) {
          if (hello) {
            setSearchConfig({
              page: 1,
              stack: [],
              size: 6,
              isEnd: true,
              categoryType: "",
            });
            setList([]);
            setLoadingStatus(false);
          } else {
            setList((prev) => prev.concat(res.data.data));
            setLoadingStatus(false);
          }
        }
      } catch (err) {
        throw new Error(err);
      }
    }
    fetchData();
  }, [searchConfig]);
  return {
    list,
    loadingStatus,
    setList,
    setLoadingStatus,
    searchConfig,
    setSearchConfig,
  };
}
