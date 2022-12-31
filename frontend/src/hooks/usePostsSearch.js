import axios from "axios";
import { useEffect, useState } from "react";
import { API_URL } from "../API_URL";
export default function usePostsSearch() {
  const [searchConfig, setSearchConfig] = useState({
    stack: [1],
    size: 6,
    page: 1,
    // isEnd: true -> all return, false -> 모집중 return
    // categoryType : null || "" -> all return , '스터디' || '프로젝트' -> 그것에 맞는거 return
    // isEnd , categorType 은 백엔드 개발중
  });
  //   console.log("searchConfig : ", searchConfig);
  const [list, setList] = useState([]);
  const [loadingStatus, setLoadingStatus] = useState(false);
  useEffect(() => {
    async function fetchData() {
      try {
        setLoadingStatus(true);
        const res = await axios.post(
          API_URL + "/posts",
          {
            categoryType: "프로젝트",
            stack: [],
            isEnd: "false",
            page: "1",
            size: "6",
          },
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        console.log(res);
        if (res.data.code === 1) {
          setList(res.data.data);
          //   console.log("in hook, usePostsSearch", res.data.data);
          //   console.log("zzzz", res);
          console.log("list : ", list);
          setLoadingStatus(false);
        } else {
          console.log("오류발생..ㅠㅠ");
        }
      } catch (err) {
        throw new Error(err);
      }
    }
    fetchData();
  }, []);
  return { list, loadingStatus };
}
