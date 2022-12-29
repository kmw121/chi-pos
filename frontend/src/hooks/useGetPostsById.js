import { useSelector } from "react-redux";

export default function useGetPostsById(id) {
  const { posts } = useSelector((state) => {
    return state.user;
  });
  return posts[id - 1];
}
