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
      const res = await axios.post(
        "http://3.39.164.180:8080/login",
        loginForm
        //  { withCredentials: true }
      );
      const { accessToken } = res.data.data;
      // axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
      // res.data.data => JWT TOKEN
      const jwtToken = res.data.data.accessToken;
      const decoded = jwt_decode(jwtToken);
      dispatch(setUser(decoded));

      const expires = new Date();
      expires.setFullYear(expires.getFullYear() + 10);

      setCookie("jwtToken", jwtToken, {
        path: '/',        // 쿠키 값을 저장하는 서버 경로
        expires,          // 유효 시간
        //secure: true,   // 웹 브라우저와 웹 서버가 https로 통신하는 경우에만 쿠키 저장
        //httpOnly: true  // document.cookie라는 자바스크립트 코드로 쿠키에 비정상적으로 접속하는 것을 막는 옵션
      });

      onToggle();
      setLoginForm((prev) => {
        return { ...prev, username: "", password: "" };
      });
      alert(`${loginForm.username}님 반갑습니다!`);
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
        </ModalMain>
      </ModalContainer>
    </>
  );
}

export default SignInForm;
