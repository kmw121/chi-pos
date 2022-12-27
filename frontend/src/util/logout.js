import { deleteCookie } from "../cookie";

export const logout = () => {
  deleteCookie(["jwtToken"]);
  deleteCookie(["refreshToken"]);
  alert("로그아웃되었습니다.");
};
