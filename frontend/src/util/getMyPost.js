import axios from "axios";
import { API_URL } from "./API_URL";
import { getCookie, deleteCookie } from "./cookie";
import { setUser, setUserInfo } from "../slice/userSlice";
export default async function getMyPost(dispatch, navigate) {
  try {
    // myPosts 넣는거 해야됨.
    const res = await axios.get(API_URL + "/myPost", {
      headers: {
        Authorization: `${getCookie("jwtToken")}`,
      },
    });
    console.log("res : ", res);
    if (res.data.code === 1) {
      console.log("res.data.code === 1");
    } else if (res.data.code === 2) {
      const nextRes = await axios.get(API_URL + "/withdrawal", {
        headers: { Authorization: `${getCookie("refreshToken")}` },
      });
      if (nextRes.data.code === 2 || nextRes.data.code === -1) {
        deleteCookie(["jwtToken"]);
        deleteCookie(["refreshToken"]);
        dispatch(setUserInfo([]));
        dispatch(setUser([]));
        alert("잘못된 접근입니다. 다시 로그인 해주세요.");
        navigate("/");
      } else if (nextRes.data.code !== -1) {
        console.log("refresh token 으로 로그인");
      }
    }
  } catch (err) {
    throw new Error(err);
  }
}
