import { API_URL } from "./API_URL";
import axios from "axios";
import deleteAuthCookies from "./deleteAuthCookies";
import { setEditingPost, setUser } from "../slice/userSlice";
import { getCookie } from "./cookie";
import { toast } from "react-toastify";
import { accessTokenValidate, refreshTokenValidate } from "./tokenValidation";
import wrongRequest from "./wrongRequest";
export default async function getWithdrawal(token, dispatch, navigate) {
  const widthdrawalRes = await axios.get(API_URL + "/withdrawal", {
    headers: { Authorization: `${token}` },
  });
  const { accessValid, accessExpired, accessInvalid } = accessTokenValidate(
    widthdrawalRes
  );
  if (accessValid) {
    dispatch(setEditingPost({}));
    deleteAuthCookies();
    dispatch(setUser([]));
    toast.success("회원 탈퇴가 완료되었습니다. 이용해 주셔서 감사합니다.");
    navigate("/");
    return;
  }
  if (accessInvalid) {
    wrongRequest(dispatch, navigate);
    return;
  }
  if (accessExpired) {
    const nextWithdrawalRes = await axios.get(API_URL + "/withdrawal", {
      headers: { Authorization: getCookie("refreshToken") },
    });
    const {
      refreshValid,
      refreshExpired,
      refreshInvalid,
    } = refreshTokenValidate(nextWithdrawalRes);
    if (refreshExpired || refreshInvalid) {
      deleteAuthCookies();
      dispatch(setUser([]));
      dispatch(setEditingPost({}));
      toast.error("잘못된 접근입니다.");
      navigate("/");
      return;
    }
    if (refreshValid) {
      deleteAuthCookies();
      dispatch(setUser([]));
      dispatch(setEditingPost({}));
      toast.success("회원 탈퇴가 완료되었습니다. 이용해 주셔서 감사합니다.");
      navigate("/");
      return;
    }
  }
}
