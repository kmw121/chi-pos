import axios from "axios";
import { API_URL } from "./API_URL";
import { getCookie, deleteCookie } from "./cookie";
import {
  setUserInfo,
  setIsLogin,
  setUser,
  setCurrentPost,
} from "../slice/userSlice";
export default async function withdrawal(dispatch, navigate) {
  if (window.confirm("회원 탈퇴를 하시겠습니까?")) {
    try {
      const res = await axios.delete(API_URL + "/withdrawal", {
        headers: {
          Authorization: `${getCookie("jwtToken")}`,
        },
      });
      if (res.data.code === 1) {
        deleteCookie(["jwtToken"]);
        deleteCookie(["refreshToken"]);
        dispatch(setUserInfo([]));
        dispatch(setUser([]));
        dispatch(setCurrentPost({}));
        dispatch(setIsLogin(false));
        alert("회원 탈퇴가 완료되었습니다. 이용해 주셔서 감사합니다.");
        navigate("/");
      } else if (res.data.code === 2) {
        const nextRes = await axios.get(API_URL + "/withdrawal", {
          headers: { Authorization: `${getCookie("refreshToken")}` },
        });
        if (nextRes.data.code === 2 || nextRes.data.code === -1) {
          deleteCookie(["jwtToken"]);
          deleteCookie(["refreshToken"]);
          dispatch(setUserInfo([]));
          dispatch(setUser([]));
          dispatch(setCurrentPost({}));
          alert("잘못된 접근입니다.");
          window.location.reload();
        } else if (nextRes.data.code === 1) {
          deleteCookie(["jwtToken"]);
          deleteCookie(["refreshToken"]);
          dispatch(setUserInfo([]));
          dispatch(setUser([]));
          dispatch(setCurrentPost({}));
          dispatch(setIsLogin(false));
          alert("회원 탈퇴가 완료되었습니다. 이용해 주셔서 감사합니다.");
          navigate("/");
        }
      }
    } catch (err) {
      throw new Error(err);
    }
  }
}
