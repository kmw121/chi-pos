import axios from "axios";
import { useEffect, useState } from "react";
import { API_URL } from "../API_URL";
export default async function usePostsSearch() {
  const [searchConfig, setSearchConfig] = useState({
    // stack : [],
    size: 6,
    page: 1,
  });
  console.log("searchConfig : ", searchConfig);
  const [list, setList] = useState([]);
  const [loadingStatue, setLoadingStatus] = useState(false);
  try {
    const res = await axios.get(
      API_URL + "/posts",
      JSON.stringify({ size: 6, page: 1 }),
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    console.log("in hook, usePostsSearch", res);
    setList(res);
  } catch (err) {
    throw new Error(err);
  }
}
