import { setCookie } from "./cookie";

export default function settingAuthCookies(access, refresh, option) {
  setCookie("jwtToken", access, option);
  setCookie("refreshToken", refresh, option);
}
