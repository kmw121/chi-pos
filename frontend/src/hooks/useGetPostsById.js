import axios from "axios";
import { useEffect } from "react";
import { API_URL } from "../util/API_URL";
import { setCurrentPost } from "../slice/userSlice";
export default function useGetPostsById(id, dispatch) {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(API_URL + `/posts/all`);
        const post = res.data.data.filter((data) => String(data.id) === id);
        console.log("res : ", res);
        console.log("post : ", post);
        dispatch(setCurrentPost(post));
      } catch (err) {
        throw new Error(err);
      }
    };
    fetchData();
  }, []);
}
