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
  navigate,
  setFormReg
) {
  const changeInfoResponse = await axios({
    method: "POST",
    url: API_URL + address,
    mode: "cors",
    headers: { "Content-Type": "multipart/form-data", Authorization: token },
    data: formdata,
  });
  console.log("res : ", changeInfoResponse);
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
    const isAlreadyNickName =
      changeInfoResponse.data.message === "이미 존재하는 닉네임입니다.";
    const isPrePasswordInvalid =
      changeInfoResponse.data.message === "기존 비밀번호가 올바르지 않습니다.";
    if (isAlreadyNickName) {
      setFormReg({ nick: true });
    }
    if (isPrePasswordInvalid) {
      setFormReg({ prePassword: true });
    }
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
