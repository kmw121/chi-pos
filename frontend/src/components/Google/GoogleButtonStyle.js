import {
  GoogleBtn,
  GoogleBtnText,
  GoogleIconWrapper,
  GoogleIconImg,
} from "./socialButton";

export default function GoogleButtonStyle({ onClick }) {
  return (
    <GoogleBtn onClick={onClick}>
      <GoogleIconWrapper>
        <GoogleIconImg
          alt="google"
          src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
        />
      </GoogleIconWrapper>
      <GoogleBtnText> 구글로 시작하기</GoogleBtnText>
    </GoogleBtn>
  );
}
