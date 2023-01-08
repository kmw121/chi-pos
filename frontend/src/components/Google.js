import React from "react";
import GoogleLogin from "react-google-login";

const clientId =
  "410536498654-65qpckepv8mo646k8dap7ufhscovs0h3.apps.googleusercontent.com";

export default function GoogleButton() {
  const onSuccess = async (response) => {
    console.log(response);

    const {
      googleId,
      profileObj: { email, name },
    } = response;

    //     await onSocial({
    //       socialId: googleId,
    //       socialType: "google",
    //       email,
    //       nickname: name,
    //     });
  };

  const onFailure = (error) => {
    console.log(error);
  };

  return (
    <div>
      <GoogleLogin
        clientId={clientId}
        responseType={"id_token"}
        onSuccess={onSuccess}
        onFailure={onFailure}
      />
    </div>
  );
}
