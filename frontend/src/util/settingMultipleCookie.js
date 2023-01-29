import { setCookie } from "./cookie";

export default function settingMultipleCookie(access, refresh, option) {
  setCookie("jwtToken", access, option);
  setCookie("refreshToken", refresh, option);
}
