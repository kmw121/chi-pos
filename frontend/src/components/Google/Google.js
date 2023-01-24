import React from "react";
import GoogleLogin from "react-google-login";
import GoogleButtonStyle from "./GoogleButtonStyle";
import axios from "axios";
import { API_URL } from "../../util/API_URL";
import { useNavigate } from "react-router-dom";
import { setCookie } from "../../util/cookie";
import jwt_decode from "jwt-decode";
import { useDispatch } from "react-redux";
import { setUser, setUserInfo, setIsLogin } from "../../slice/userSlice";
export default function GoogleButton() {
  const clientId =
    "410536498654-65qpckepv8mo646k8dap7ufhscovs0h3.apps.googleusercontent.com";
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onSuccess = async (response) => {
    try {
      const res = await axios.get(
        API_URL + `/ouath/google?code=${response.accessToken}`
      );
      if (res.data.code === 2) {
        setCookie("Google", res.data.data);
        navigate("/googleSignup");
      } else if (res.data.code === 1) {
        const jwtToken = res.data.data.accessToken;
        const refreshToken = res.data.data.refreshToken;
        const decoded = jwt_decode(jwtToken);
        dispatch(setUser(decoded));
        const nextRes = await axios.get(API_URL + `/user/${decoded.id}`, {
          headers: {
            Authorization: jwtToken,
          },
        });
        dispatch(setUserInfo(nextRes.data));
        navigate("/");
        setCookie("jwtToken", jwtToken, { path: "/" });
        setCookie("refreshToken", refreshToken, { path: "/" });
        alert("구글로 로그인 되었습니다.");
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
    <GoogleLogin
      clientId={clientId}
      onSuccess={onSuccess}
      onFailure={onFailure}
      cookiePolicy={"single_host_origin"}
      render={({ onClick }) => <GoogleButtonStyle onClick={onClick} />}
    />
  );
}
