import FacebookLogin from "react-facebook-login";

function Facebook() {
  const responseFacebook = (response) => {
    console.log(response);
  };

  return (
    <FacebookLogin
      appId="580687360544718"
      autoLoad={false}
      fields="name, email, picture"
      callback={responseFacebook}
      icon="fa-facebook"
      textButton="ㅍㅔ이스북으로 시작하긔"
    />
  );
}

export default Facebook;
