import { useSelector } from "react-redux";

export default function useGetPostsById(id) {
  const { posts } = useSelector((state) => {
    return state.user;
  });
  const post = posts.filter((data) => String(data.id) === id);
  return post[0];
}
