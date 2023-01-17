import axios from "axios";
import { API_URL } from "./API_URL";
import { deleteCookie, getCookie, setCookie } from "./cookie";
import { setUser, setUserInfo, setCurrentPost } from "../slice/userSlice";
export default async function authCheck(dispatch, navigate, user) {
  if (!user.id) {
    alert("로그인이 필요한 페이지 입니다.");
    navigate("/");
    deleteCookie(["jwtToken"]);
    deleteCookie(["refreshToken"]);
    dispatch(setUserInfo([]));
    dispatch(setUser([]));
  } else {
    try {
      const res = await axios.get(API_URL + `/user/${user.id}`, {
        headers: {
          Authorization: `${getCookie("jwtToken")}`,
        },
      });
      if (res.data.code === -1) {
        deleteCookie(["jwtToken"]);
        deleteCookie(["refreshToken"]);
        dispatch(setUserInfo([]));
        dispatch(setUser([]));
        dispatch(setCurrentPost({}));
        alert("로그인이 필요한 페이지 입니다.");
        navigate("/");
      } else if (res.data.code === 2) {
        const nextRes = await axios.get(API_URL + `/user/${user.id}`, {
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
          deleteCookie("jwtToken");
          setCookie("jwtToken", nextRes.data.data);
          const response = await axios.get(API_URL + `/user/${user.id}`, {
            headers: { Authorization: `${getCookie("jwtToken")}` },
          });
          if (response.data.code === 1) {
            dispatch(setUserInfo(response.data));
          }
        }
      } else if (res.data.code === 1) {
        dispatch(setUserInfo(res.data));
      }
    } catch (err) {
      throw new Error(err);
    }
  }
}
