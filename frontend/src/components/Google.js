import React, { useEffect } from "react";
import GoogleLogin from "react-google-login";
import GoogleGoogle from "./MaryLu";
import { gapi } from "gapi-script";
import axios from "axios";
import { API_URL } from "../util/API_URL";
const clientId =
  "410536498654-65qpckepv8mo646k8dap7ufhscovs0h3.apps.googleusercontent.com";
export default function GoogleButton() {
  const onSuccess = async (response) => {
    console.log(response);
    console.log("response.googleId : ", response.googleId);
    const res = await axios.post(
      API_URL + `/ouath/google?code=${response.accessToken}`
    );
    console.log("res : ", res);
  };

  const onFailure = (error) => {
    console.log(error);
  };
  return (
    <GoogleLogin
      clientId={clientId}
      onSuccess={onSuccess}
      onFailure={onFailure}
      cookiePolicy={"single_host_origin"}
      render={({ onClick }) => <GoogleGoogle onClick={onClick} />}
      // redirectUri="http://www.chi-pos.com/accounts/google/login/callback/"
    />
  );
}
