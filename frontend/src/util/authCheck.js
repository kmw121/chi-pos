import { getCookie, setCookie } from "./cookie";
import getUserInfo from "./getUserInfo";
import wrongRequest from "./wrongRequest";
import { accessTokenValidate, refreshTokenValidate } from "./tokenValidation";

export default async function authCheck(dispatch, navigate, user) {
  if (!user.code || user.code !== 1) {
    wrongRequest(dispatch, navigate);
  } else {
    try {
      const getUser = await getUserInfo(user.data, getCookie("jwtToken"));
      const { accessExpired, accessInvalid } = accessTokenValidate(getUser);
      if (accessInvalid) {
        wrongRequest(dispatch, navigate);
        return;
      }
      if (accessExpired) {
        const nextGetUser = await getUserInfo(
          user.data,
          getCookie("refreshToken")
        );
        const {
          refreshValid,
          refreshExpired,
          refreshInvalid,
        } = refreshTokenValidate(nextGetUser);
        if (refreshExpired || refreshInvalid) {
          wrongRequest(dispatch, navigate);
          return;
        }
        if (refreshValid) {
          setCookie("jwtToken", nextGetUser.data.data);
          return;
        }
      }
    } catch (err) {
      throw new Error(err);
    }
  }
}
