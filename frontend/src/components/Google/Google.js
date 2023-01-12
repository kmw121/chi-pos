import React, { useEffect } from "react";
import GoogleLogin from "react-google-login";
import GoogleButtonStyle from "./GoogleButtonStyle";
import axios from "axios";
import { API_URL } from "../../util/API_URL";
import { useNavigate } from "react-router-dom";
import { setCookie, deleteCookie } from "../../util/cookie";
import jwt_decode from "jwt-decode";
import { useDispatch } from "react-redux";
import { setUser, setUserInfo } from "../../slice/userSlice";
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
        alert("구글 회원가입으로 이동합니다.");
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
        deleteCookie("jwtToken");
        deleteCookie("refreshToken");
        document.cookie = "jwtToken" + " = " + jwtToken + "; path=/; ";
        console.log("토큰생성1");
        document.cookie = "refreshToken" + " = " + refreshToken + "; path=/; ";
        console.log("토큰생성2");
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
