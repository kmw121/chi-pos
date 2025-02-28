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
        const res = await axios.get(API_URL + "/posts", {
          params: {
            page: searchConfig.page,
            size: searchConfig.size,
            isEnd: searchConfig.isEnd,
            categoryType: searchConfig.categoryType,
            stack: !searchConfig.stack.length
              ? ""
              : `${searchConfig.stack.reduce((acc, cur) => `${acc},${cur}`)}`,
          },
        });
        const isSuccess = res.data.code === 1;
        const isFail = res.data.code === -1;
        if (isSuccess) {
          setList(() => list.concat(res.data.data));
          setLoadingStatus(false);
        } else if (isFail) {
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
