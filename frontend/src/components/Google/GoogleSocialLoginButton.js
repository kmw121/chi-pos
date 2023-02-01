import React from "react";
import GoogleLogin from "react-google-login";
import GoogleButtonStyle from "./GoogleButtonStyle";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import handleGoogleAuth from "../../util/handleGoogleAuth";
import { toast } from "react-toastify";

const clientId =
  "410536498654-65qpckepv8mo646k8dap7ufhscovs0h3.apps.googleusercontent.com";

export default function GoogleSocialLoginButton() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onSuccess = async (response) => {
    console.log("success res ", response);
    try {
      await handleGoogleAuth(response, dispatch, navigate);
    } catch {
      toast.error("오류로 인하여 취소되었습니다.");
    }
  };
  const onFailure = (e) => {
    toast.error(e);
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
