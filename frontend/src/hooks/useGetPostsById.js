import axios from "axios";
import { useEffect, useState } from "react";
import { API_URL } from "../util/API_URL";
export default function useGetPostsById(id) {
  const [currentPost, setCurrentPost] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(API_URL + `/posts/all`);
        if (res.data.code === 1) {
          const post = res.data.data.filter((data) => String(data.id) === id);
          setCurrentPost(post);
        }
      } catch (err) {
        throw new Error(err);
      }
    }
    fetchData();
  }, []);
  return { currentPost, setCurrentPost };
}
