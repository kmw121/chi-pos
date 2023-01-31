import axios from "axios";
import { API_URL } from "./API_URL";
import { toast } from "react-toastify";
import { setCookie, getCookie } from "./cookie";
import wrongRequest from "./wrongRequest";
import {
  accessTokenValidate,
  refreshTokenValidate,
  newAccessTokenValidate,
} from "./tokenValidation";
import { logout } from "./logout";
import { fetchCurrentPost } from "../slice/userSlice";

export default async function postDelete(id, token, dispatch, navigate) {
  const deleteRes = await axios.delete(API_URL + `/post/${id}`, {
    headers: {
      Authorization: `${token}`,
    },
  });
  const { accessValid, accessExpired, accessInvalid } = accessTokenValidate(
    deleteRes
  );
  if (accessValid) {
    toast.success("삭제되었습니다.");
    navigate("/");
    dispatch(fetchCurrentPost(id));
    return;
  }
  if (accessExpired) {
    const nextDeleteRes = await axios.delete(API_URL + `/post/${id}`, {
      headers: {
        Authorization: `${getCookie("refreshToken")}`,
      },
    });
    const {
      refreshValid,
      refreshExpired,
      refreshInvalid,
    } = refreshTokenValidate(nextDeleteRes);
    if (refreshValid) {
      setCookie("jwtToken", nextDeleteRes.data.data);
      const response = await axios.delete(API_URL + `/post/${id}`, {
        headers: {
          Authorization: nextDeleteRes.data.data,
        },
      });
      const {
        newAccessValid,
        newAccessExpired,
        newAccessInvalid,
      } = newAccessTokenValidate(response);
      if (newAccessValid) {
        toast.success("삭제되었습니다.");
        navigate("/");
        dispatch(fetchCurrentPost(id));
        return;
      }
      if (newAccessExpired || newAccessInvalid) {
        wrongRequest(dispatch, navigate);
        toast.error("잘못된 접근입니다. 다시 로그인해주세요.");
        navigate("/");
        return;
      }
    }
    if (refreshExpired || refreshInvalid) {
      wrongRequest(dispatch, navigate);
      toast.error("잘못된 접근입니다. 다시 로그인해주세요.");
      navigate("/");
      return;
    }
  }
  if (accessInvalid) {
    toast.error("잘못된 접근입니다. 다시 로그인해주세요.");
    logout();
    return;
  }
}
