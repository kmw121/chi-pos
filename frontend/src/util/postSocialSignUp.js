import axios from "axios";
import { API_URL } from "./API_URL";
import settingAuthCookies from "./settingAuthCookies";
import jwt_decode from "jwt-decode";
import { fetchUser } from "../slice/userSlice";
import { toast } from "react-toastify";
import { deleteCookie } from "./cookie";
export default async function postSocialSignUp(
  formdata,
  address,
  dispatch,
  navigate
) {
  const socialResponse = await axios({
    method: "POST",
    url: API_URL + address,
    mode: "cors",
    headers: { "Content-Type": "multipart/form-data" },
    data: formdata,
  });
  const isSuccess = socialResponse.data.code === 1;
  const isFail = socialResponse.data.code === -1;
  if (isSuccess) {
    const { accessToken, refreshToken } = socialResponse.data.data;
    settingAuthCookies(accessToken, refreshToken, {
      path: "/",
      domain: "chi-pos.com",
    });
    const decoded = jwt_decode(accessToken);
    dispatch(fetchUser(decoded));
    navigate("/");
    toast.success("소셜 회원가입이 완료되었습니다.");
    deleteCookie("Google");
    return;
  }
  if (isFail) {
    toast.error("소셜 회원가입에 실패하였습니다.");
  }
}
