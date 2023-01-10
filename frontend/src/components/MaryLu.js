import {
  GoogleBtn,
  GoogleBtnText,
  GoogleIconWrapper,
  GoogleIconImg,
} from "./components";

export default function GoogleGoogle({ onClick }) {
  return (
    <GoogleBtn onClick={onClick}>
      <GoogleIconWrapper>
        <GoogleIconImg
          alt="google"
          src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
        />
      </GoogleIconWrapper>
      <GoogleBtnText>Sign in with Google</GoogleBtnText>
    </GoogleBtn>
  );
}
