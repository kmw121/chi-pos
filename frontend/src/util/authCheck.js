import axios from "axios";
import { API_URL } from "../API_URL";
import { deleteCookie, getCookie, setCookie } from "../cookie";
import { setUser, setUserInfo } from "../slice/userSlice";
export default async function authCheck(dispatch, navigate, user) {
  if (!user.id) {
    alert("로그인이 필요한 페이지 입니다.");
    navigate("/");
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
        alert("로그인이 필요한 페이지 입니다.");
        navigate("/");
      } else if (res.data.code === 2) {
        const nextRes = await axios.get(API_URL + `/user/${user.id}`, {
          headers: { Authorization: `${getCookie("refreshToken")}` },
        });
        console.log("auth success");
        if (nextRes.data.data === 2 || nextRes.data.data === -1) {
          deleteCookie(["jwtToken"]);
          deleteCookie(["refreshToken"]);
          dispatch(setUserInfo([]));
          dispatch(setUser([]));
          alert("잘못된 접근입니다.");
          window.location.reload();
        } else if (nextRes.data.data !== -1) {
          deleteCookie("jwtToken");
          setCookie("jwtToken", nextRes.data.data);
        }
      }
      console.log("auth success");
      dispatch(setUserInfo(res.data));
    } catch (err) {
      console.log(err);
    }
  }
}
