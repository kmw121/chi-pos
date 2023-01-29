import { deleteCookie } from "./cookie";

export default function deleteMultipleCookies() {
  deleteCookie("jwtToken");
  deleteCookie("refreshToken");
}
