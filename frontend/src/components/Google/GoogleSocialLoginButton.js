import React from "react";
import GoogleLogin from "react-google-login";
import GoogleButtonStyle from "./GoogleButtonStyle";
import { useNavigate } from "react-router-dom";
import { setCookie } from "../../util/cookie";
import jwt_decode from "jwt-decode";
import { useDispatch } from "react-redux";
import { setUser, setUserInfo, setIsLogin } from "../../slice/userSlice";
import handleGoogleAuth from "../../util/handleGoogleAuth";
import getUserInfo from "../../util/getUserInfo";
import { toast, ToastContainer } from "react-toastify";
import { injectStyle } from "react-toastify/dist/inject-style";
if (typeof window !== "undefined") {
  injectStyle();
}
export default function GoogleSocialLoginButton() {
  const clientId =
    "410536498654-65qpckepv8mo646k8dap7ufhscovs0h3.apps.googleusercontent.com";
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onSuccess = async (response) => {
    try {
      const googleResponse = await handleGoogleAuth(response);
      if (googleResponse.data.code === 2) {
        setCookie("Google", googleResponse.data.data);
        navigate("/googleSignup");
      } else if (googleResponse.data.code === 1) {
        const { accessToken, refreshToken } = googleResponse.data.data;
        const decoded = jwt_decode(accessToken);
        dispatch(setUser(decoded));
        const userInfo = await getUserInfo(decoded, accessToken);
        dispatch(setUserInfo(userInfo.data));
        navigate("/");
        toast.success("구글로 로그인 되었습니다.");
        setCookie("jwtToken", accessToken, { path: "/" });
        setCookie("refreshToken", refreshToken, { path: "/" });
        dispatch(setIsLogin(false));
      }
    } catch (err) {
      throw new Error(err);
    }
  };

  const onFailure = (e) => {
    throw new Error(e);
  };
  return (
    <>
      <GoogleLogin
        clientId={clientId}
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={"single_host_origin"}
        render={({ onClick }) => <GoogleButtonStyle onClick={onClick} />}
      />
      <ToastContainer />
    </>
  );
}
