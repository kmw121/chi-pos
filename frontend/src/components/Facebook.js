import axios from "axios";
import FacebookLogin from "react-facebook-login";
import { API_URL } from "../util/API_URL";

function Facebook() {
  const responseFacebook = async (response) => {
    const res = await axios.post(
      API_URL + `/ouath/facebook?code=${response.id}`
    );
    console.log("res :", res);
  };

  return (
    <FacebookLogin
      appId="580687360544718"
      autoLoad={false}
      fields="name, email, picture"
      callback={responseFacebook}
      icon="fa-facebook"
      buttonStyle={{ width: "100%", borderRadius: "10px", fontSize: "15px" }}
    />
  );
}

export default Facebook;
