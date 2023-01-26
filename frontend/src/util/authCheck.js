import { getCookie, setCookie } from "./cookie";
import { fetchUser } from "../slice/userSlice";
import getUserInfo from "./getUserInfo";
import wrongRequest from "./wrongRequest";
import jwt_decode from "jwt-decode";

export default async function authCheck(dispatch, navigate, user) {
  if (user.data.code === -1) {
    wrongRequest(dispatch, navigate);
  } else {
    try {
      const getUser = await getUserInfo(user, getCookie("jwtToken"));
      if (getUser.data.code === -1) {
        wrongRequest(dispatch, navigate);
      } else if (getUser.data.code === 2) {
        const nextGetUser = await getUserInfo(user, getCookie("refreshToken"));
        if (nextGetUser.data.code === 2 || nextGetUser.data.code === -1) {
          wrongRequest(dispatch, navigate);
        } else if (nextGetUser.data.code === 1) {
          setCookie("jwtToken", nextGetUser.data.data);
          const decoded = jwt_decode(nextGetUser.data.data);
          fetchUser(decoded);
        }
      }
      // getUser.data.code === 1 이면 그냥 아무일도 없어야됨...
    } catch (err) {
      throw new Error(err);
    }
  }
}
