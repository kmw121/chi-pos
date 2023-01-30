import axios from "axios";
import { useEffect } from "react";
import { API_URL } from "../util/API_URL";
import { setCurrentPost } from "../slice/userSlice";

export default function useGetPostsById(id, dispatch) {
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(API_URL + `/post/${id}`);
        const isSuccess = res.data.code === 1;
        if (isSuccess) {
          dispatch(setCurrentPost(res.data.data));
        }
      } catch (err) {
        throw new Error(err);
      }
    }
    fetchData();
  }, []);
}
