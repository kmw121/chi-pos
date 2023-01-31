import { useEffect } from "react";
import { fetchCurrentPost } from "../slice/userSlice";

export default function useGetPostsById(id, dispatch) {
  useEffect(() => {
    async function fetchData() {
      dispatch(fetchCurrentPost(id));
    }
    fetchData();
  }, []);
}
