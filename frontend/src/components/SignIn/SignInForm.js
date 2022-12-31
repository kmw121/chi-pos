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
import { setUser } from "../../slice/userSlice";
import { useDispatch } from "react-redux";
import { useCookies } from "react-cookie";
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
  const [_, setCookie] = useCookies(["jwtToken"]);
  const [refresh, setRefresh] = useCookies(["refreshToken"]);
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
  const onLogin = async (e) => {
    try {
      const res = await axios.post("http://3.39.164.180:8080/login", loginForm);
      if (res.data.code === 1) {
        const jwtToken = res.data.data.accessToken;
        const refreshToken = res.data.data.refreshToken;
        const decoded = jwt_decode(jwtToken);
        const decodedR = jwt_decode(refreshToken);
        console.log("refresh decoded", decodedR);
        dispatch(setUser(decoded));
        setCookie("jwtToken", jwtToken);
        setRefresh("refreshToken", refreshToken);
        onToggle();
        setLoginForm((prev) => {
          return { ...prev, username: "", password: "" };
        });
        console.log(res);
        console.log(decoded);
        alert(`${loginForm.username}님 반갑습니다!`);
      } else if (res.data.code === -1) {
        alert("id/pw를 확인해주세요.");
      }
    } catch (err) {
      throw new Error(err);
    }
  };
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
              <ModalBtnGoogle>
                <img
                  style={{ width: "50px", height: "50px", zInde: "50" }}
                  src={"/logo/google.png"}
                  alt="github"
                />
              </ModalBtnGoogle>
              <ModalBtnText>Google 로그인</ModalBtnText>
            </ModalBtnBox>
            <ModalBtnBox>
              <ModalBtnGithub>
                <img
                  style={{ width: "50px", height: "50px", zInde: "50" }}
                  src={"/logo/github.png"}
                  alt="github"
                />
              </ModalBtnGithub>
              <ModalBtnText> Github 로그인</ModalBtnText>
            </ModalBtnBox>
            <ModalBtnBox>
              <ModalBtnKakao>
                <img
                  style={{ width: "50px", height: "50px", zInde: "50" }}
                  src={"/logo/kakao.png"}
                  alt="github"
                />
              </ModalBtnKakao>
              <ModalBtnText>Kakao 로그인</ModalBtnText>
            </ModalBtnBox>
          </ModalBtnContainer>
        </ModalMain>
      </ModalContainer>
    </>
  );
}

export default SignInForm;
