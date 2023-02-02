import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useGetPreventScrolling } from "../../hooks/useGetPreventScrolling";
import {
  ModalMain,
  ModalBackground,
  ModalContainer,
  ModalHeader,
  ModalWelcome,
  ModalInnerBox,
  IdInput,
  PwInput,
  ModalBtnContainer,
  ModalBtnBox,
  ModalBtnKakao,
  ModalLogoImg,
  ModalBottomSection,
  ModalBottomCancelBtn,
  ModalBottomOkBtn,
  ModalBtnKakaoIcon,
  ModalInputValueInvalid,
} from "./signInComponents";
import { useDispatch } from "react-redux";
import { KAKAO_AUTH_URL } from "../../util/kakaoAuth";
import { gapi } from "gapi-script";
import GoogleSocialLoginButton from "../Google/GoogleSocialLoginButton";
import postLogin from "../../util/postLogin";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const clientId =
  "410536498654-65qpckepv8mo646k8dap7ufhscovs0h3.apps.googleusercontent.com";

function SignInForm({ onToggle }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useGetPreventScrolling();
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });
  const [loginFormReg, setLoginFormReg] = useState({
    username: "",
    password: "",
  });
  const onEmailValue = (e) => {
    setLoginForm((prev) => {
      return { ...prev, username: e.target.value };
    });
  };
  const onPwValue = (e) => {
    setLoginForm((prev) => {
      return { ...prev, password: e.target.value };
    });
  };
  const onPwPress = (e) => {
    if (e.keyCode === 13) {
      onLogin();
    }
  };
  const onLogin = async () => {
    try {
      await postLogin(
        loginForm,
        dispatch,
        navigate,
        true,
        onToggle,
        setLoginFormReg
      );
    } catch {
      toast.error("로그인에 실패하였습니다.");
    }
  };
  console.log("login reg : ", loginFormReg);
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId,
        scope: "email",
      });
    }
    gapi.load("client:auth2", start);
  });
  return (
    <>
      <ModalBackground onClick={onToggle} />
      <ModalContainer>
        <ModalHeader onClick={(e) => e.stopPropagation()}>
          <ModalLogoImg alt="logo here" src={"/c-pos/ms-icon-310x310.png"} />
          <AiOutlineClose onClick={onToggle} className="signInClose" />
        </ModalHeader>
        <ModalMain>
          <ModalWelcome>취포스에 오신 것을 환영합니다!</ModalWelcome>
          <ModalInnerBox>
            <IdInput
              onChange={onEmailValue}
              value={loginForm.username}
              placeholder="E-MAIL"
            />
            {loginFormReg.username && (
              <ModalInputValueInvalid>
                등록되지 않은 회원입니다.
              </ModalInputValueInvalid>
            )}
            <PwInput
              onChange={onPwValue}
              onKeyDown={onPwPress}
              value={loginForm.password}
              placeholder="PASSWORD"
              type="password"
            />
            {loginFormReg.password && (
              <ModalInputValueInvalid>
                {" "}
                비밀번호를 확인해 주세요.
              </ModalInputValueInvalid>
            )}
          </ModalInnerBox>
          <ModalBottomSection>
            <ModalBottomCancelBtn onClick={onToggle}>취소</ModalBottomCancelBtn>
            <ModalBottomOkBtn onClick={onLogin}>로그인</ModalBottomOkBtn>
          </ModalBottomSection>
          <ModalBtnContainer>
            <ModalBtnBox>
              <GoogleSocialLoginButton />
              <ModalBtnKakao onToggle={onToggle} href={KAKAO_AUTH_URL}>
                <ModalBtnKakaoIcon
                  src={"/logo/kakao_login_btn.png"}
                  alt="kakao"
                />
              </ModalBtnKakao>
            </ModalBtnBox>
          </ModalBtnContainer>
        </ModalMain>
      </ModalContainer>
    </>
  );
}

export default SignInForm;
