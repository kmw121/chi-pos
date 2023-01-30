import { deleteCookie } from "./cookie";

export default function deleteAuthCookies() {
  deleteCookie("jwtToken");
  deleteCookie("refreshToken");
}
