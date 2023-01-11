import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import getPreventScrolling from "../../util/getPreventScrolling";
import {
  RegisterBottomCancelBtn,
  RegisterBottomSection,
  RegisterBottomOkBtn,
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
  ModalBtnGoogle,
  ModalBtnText,
  ModalBtnGithub,
  ModalBtnKakao,
} from "../components";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { setUser, setUserInfo } from "../../slice/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { API_URL } from "../../util/API_URL";
import { getCookie, setCookie, deleteCookie } from "../../util/cookie";
import { KAKAO_AUTH_URL } from "../../util/kakaoAuth";
import { gapi } from "gapi-script";
import GoogleLogin from "react-google-login";
import GoogleButton from "../Google";
import Facebook from "../Facebook";
function SignInForm({ onToggle }) {
  const dispatch = useDispatch();
  useEffect(() => {
    getPreventScrolling();
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });
  const { user } = useSelector((state) => {
    return state.user;
  });
  const onEmailValue = (e) => {
    const onChangeName = (prev) => {
      return { ...prev, username: e.target.value };
    };
    setLoginForm(onChangeName);
  };
  const onPwValue = (e) => {
    const onChangePw = (prev) => {
      return { ...prev, password: e.target.value };
    };
    setLoginForm(onChangePw);
  };
  const onLogin = async () => {
    try {
      const res = await axios.post(API_URL + "/login", loginForm);
      console.log(res);
      if (res.data.code === 1) {
        const jwtToken = res.data.data.accessToken;
        const refreshToken = res.data.data.refreshToken;
        const decoded = jwt_decode(jwtToken);
        dispatch(setUser(decoded));
        deleteCookie("jwtToken");
        deleteCookie("refreshToken");
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
        window.location.reload();
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
          <img
            style={{ width: "30px", height: "30px" }}
            alt="logo here"
            src="./logo/Spring.png"
          />
          <AiOutlineClose
            onClick={onToggle}
            style={{ cursor: "pointer", width: "30px", height: "30px" }}
          />
        </ModalHeader>
        <ModalMain>
          <ModalWelcome>'프로젝트 이름'에 오신 것을 환영합니다!</ModalWelcome>
          <ModalInnerBox>
            <IdInput
              onChange={onEmailValue}
              value={loginForm.username}
              placeholder="E-MAIL"
            />
            <PwInput
              onChange={onPwValue}
              value={loginForm.password}
              placeholder="PASSWORD"
              type="password"
            />
          </ModalInnerBox>
          <RegisterBottomSection>
            <RegisterBottomCancelBtn onClick={onToggle}>
              취소
            </RegisterBottomCancelBtn>
            <RegisterBottomOkBtn onClick={onLogin}>로그인</RegisterBottomOkBtn>
          </RegisterBottomSection>
          <ModalBtnContainer>
            <ModalBtnBox>
              <GoogleButton />
              <Facebook />
              <ModalBtnKakao href={KAKAO_AUTH_URL}>
                <img src={"/logo/kakao_login_btn.png"} alt="kakao" />
              </ModalBtnKakao>
            </ModalBtnBox>
          </ModalBtnContainer>
        </ModalMain>
      </ModalContainer>
    </>
  );
}

export default SignInForm;
