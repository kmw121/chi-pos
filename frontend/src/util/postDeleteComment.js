import axios from "axios";
import { API_URL } from "./API_URL";
import { toast } from "react-toastify";
import { getCookie, setCookie } from "./cookie";
import wrongRequest from "./wrongRequest";
import { accessTokenValidate, refreshTokenValidate } from "./tokenValidation";
import { fetchCurrentPost } from "../slice/userSlice";

export default async function postDeleteComment(
  contentId,
  token,
  dispatch,
  navigate,
  id
) {
  const deleteCommentRes = await axios.delete(
    API_URL + `/comment/${contentId}`,
    {
      headers: {
        Authorization: `${token}`,
      },
    }
  );
  const { accessValid, accessExpired, accessInvalid } = accessTokenValidate(
    deleteCommentRes
  );
  if (accessValid) {
    toast.success("댓글이 삭제되었습니다.");
    dispatch(fetchCurrentPost(id));
    return;
  }
  if (accessExpired) {
    const deleteCommentNextRes = await axios.delete(
      API_URL + `/comment/${contentId}`,
      {
        headers: {
          Authorization: getCookie("refreshToken"),
        },
      }
    );
    const {
      refreshValid,
      refreshExpired,
      refreshInvalid,
    } = refreshTokenValidate(deleteCommentNextRes);
    if (refreshValid) {
      setCookie("jwtToken", deleteCommentNextRes.data.data);
      await axios.delete(
        (API_URL + `/comment/${contentId}`,
        {
          headers: {
            Authorization: deleteCommentNextRes.data.data,
          },
        })
      );
      toast.error("댓글이 삭제되었습니다.");
      dispatch(fetchCurrentPost(id));
      return;
    }
    if (refreshExpired || refreshInvalid) {
      wrongRequest(dispatch, navigate);
      toast.error("잘못된 접근입니다. 다시 로그인해주세요.");
      return;
    }
  }
  if (accessInvalid) {
    wrongRequest(dispatch, navigate);
    toast.error("잘못된 접근입니다. 다시 로그인해주세요.");
    return;
  }
}
