import axios from "axios";
import { API_URL } from "./API_URL";
import { toast } from "react-toastify";
import { getCookie, setCookie } from "./cookie";
import wrongRequest from "./wrongRequest";
import {
  accessTokenValidate,
  refreshTokenValidate,
  newAccessTokenValidate,
} from "./tokenValidation";
import { fetchCurrentPost } from "../slice/userSlice";

export default async function postComment(
  post,
  comment,
  token,
  dispatch,
  navigate,
  id,
  setComment
) {
  const commentRes = await axios.post(
    API_URL + "/comment",
    { postId: post.id, detail: comment },
    {
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  const { accessValid, accessExpired, accessInvalid } = accessTokenValidate(
    commentRes
  );
  if (accessValid) {
    toast.success("댓글이 등록되었습니다!");
    setComment("");
    dispatch(fetchCurrentPost(id));
    return;
  }
  if (accessExpired) {
    const commentNextRes = await axios.post(
      API_URL + "/comment",
      { postId: post.id, detail: comment },
      {
        headers: {
          Authorization: getCookie("refreshToken"),
          "Content-Type": "application/json",
        },
      }
    );
    const {
      refreshValid,
      refreshExpired,
      refreshInvalid,
    } = refreshTokenValidate(commentNextRes);
    if (refreshValid) {
      setCookie("jwtToken", commentNextRes.data.data);
      const response = await axios.post(
        API_URL + "/comment",
        { postId: post.id, detail: comment },
        {
          headers: {
            Authorization: commentNextRes.data.data,
            "Content-Type": "application/json",
          },
        }
      );
      const { newAccessValid } = newAccessTokenValidate(response);
      if (newAccessValid) {
        toast.success("댓글이 등록되었습니다!");
        setComment("");
        dispatch(fetchCurrentPost(id));
        return;
      }
    }
    if (refreshExpired || refreshInvalid) {
      wrongRequest(dispatch, navigate);
      toast.error("잘못된 접근입니다. 다시 로그인해주세요.");
      return;
    }
  }
  if (accessInvalid) {
    toast.error("로그인 후 시도해주세요.");
    return;
  }
}
