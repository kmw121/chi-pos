import { getCookie, setCookie } from "./cookie";
import { setUserInfo } from "../slice/userSlice";
import getUserInfo from "./getUserInfo";
import wrongRequest from "./wrongRequest";
export default async function authCheck(dispatch, navigate, user) {
  if (!user.id) {
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
          const response = await getUserInfo(user, getCookie("jwtToken"));
          if (response.data.code === 1) {
            dispatch(setUserInfo(response.data));
          }
        }
      } else if (getUser.data.code === 1) {
        dispatch(setUserInfo(getUser.data));
      }
    } catch (err) {
      throw new Error(err);
    }
  }
}
