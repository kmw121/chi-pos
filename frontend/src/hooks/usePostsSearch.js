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
  const [resCode, setResCode] = useState(1);
  useEffect(() => {
    async function fetchData() {
      try {
        setLoadingStatus(true);
        const res = await axios.post(API_URL + "/posts", searchConfig);
        if (res.data.code === 1) {
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
        } else if (res.data.code === -1) {
          setLoadingStatus(false);
          setResCode(() => -1);
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
    resCode,
    setResCode,
  };
}
