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
} from "../components";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { setIsLogin, setUser, setUserInfo } from "../../slice/userSlice";
import { useDispatch } from "react-redux";
import { API_URL } from "../../util/API_URL";
import { getCookie, setCookie } from "../../util/cookie";
import { KAKAO_AUTH_URL } from "../../util/kakaoAuth";
import { gapi } from "gapi-script";
import GoogleButton from "../Google/Google";
function SignInForm({ onToggle }) {
  const dispatch = useDispatch();
  useGetPreventScrolling();
  const [loginForm, setLoginForm] = useState({
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
      const res = await axios.post(API_URL + "/login", loginForm);
      if (res.data.code === 1) {
        const jwtToken = res.data.data.accessToken;
        const refreshToken = res.data.data.refreshToken;
        const decoded = jwt_decode(jwtToken);
        dispatch(setUser(decoded));
        setCookie("jwtToken", jwtToken);
        setCookie("refreshToken", refreshToken);
        const nextRes = await axios.get(API_URL + `/user/${decoded.id}`, {
          headers: {
            Authorization: `${getCookie("jwtToken")}`,
          },
        });
        dispatch(setUserInfo(nextRes.data));
        setLoginForm((prev) => {
          return { ...prev, username: "", password: "" };
        });
        onToggle();
        alert(`${loginForm.username}님 반갑습니다!`);
        dispatch(setIsLogin(true));
      } else if (res.data.code === -1) {
        alert("id/pw를 확인해주세요.");
      }
    } catch (err) {
      throw new Error(err);
    }
  };
  const clientId =
    "410536498654-65qpckepv8mo646k8dap7ufhscovs0h3.apps.googleusercontent.com";
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
            <PwInput
              onChange={onPwValue}
              onKeyDown={onPwPress}
              value={loginForm.password}
              placeholder="PASSWORD"
              type="password"
            />
          </ModalInnerBox>
          <ModalBottomSection>
            <ModalBottomCancelBtn onClick={onToggle}>취소</ModalBottomCancelBtn>
            <ModalBottomOkBtn onClick={onLogin}>로그인</ModalBottomOkBtn>
          </ModalBottomSection>
          <ModalBtnContainer>
            <ModalBtnBox>
              <GoogleButton />
              <ModalBtnKakao href={KAKAO_AUTH_URL}>
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
