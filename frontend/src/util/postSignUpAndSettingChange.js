import axios from "axios";
import { API_URL } from "./API_URL";
import { fetchUser } from "../slice/userSlice";
import { getCookie, setCookie } from "./cookie";
import { toast } from "react-toastify";
import { accessTokenValidate, refreshTokenValidate } from "./tokenValidation";
import wrongRequest from "./wrongRequest";

export default async function postSignUpAndSettingChange(
  formdata,
  address,
  token,
  dispatch,
  navigate
) {
  const changeInfoResponse = await axios({
    method: "POST",
    url: API_URL + address,
    mode: "cors",
    headers: { "Content-Type": "multipart/form-data", Authorization: token },
    data: formdata,
  });
  const { accessValid, accessExpired, accessInvalid } = accessTokenValidate(
    changeInfoResponse
  );
  if (accessValid) {
    dispatch(fetchUser(changeInfoResponse.data.data));
    navigate("/");
    toast.success("정보가 변경되었습니다.");
    return;
  }
  if (accessInvalid) {
    toast.error(changeInfoResponse.data.message);
    return;
  }
  if (accessExpired) {
    const changeNextResponse = await axios({
      method: "POST",
      url: API_URL + address,
      mode: "cors",
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: getCookie("refreshToken"),
      },
      data: formdata,
    });
    const {
      refreshValid,
      refreshExpired,
      refreshInvalid,
    } = refreshTokenValidate(changeNextResponse);
    if (refreshExpired || refreshInvalid) {
      wrongRequest(dispatch, navigate);
      return;
    }
    if (refreshValid) {
      setCookie("jwtToken", changeNextResponse.data.data);
      const response = await axios({
        method: "POST",
        url: API_URL + address,
        mode: "cors",
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: changeNextResponse.data.data,
        },
        data: formdata,
      });
      const isNewAccessTokenValid = response.data.code === 1;
      if (isNewAccessTokenValid) {
        dispatch(fetchUser(response.data.data));
        navigate("/");
        toast.success("정보가 변경되었습니다.");
        return;
      }
    }
  }
}
