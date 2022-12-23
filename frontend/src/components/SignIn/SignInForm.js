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
function SignInForm({ onToggle, login, setLogin }) {
  useEffect(() => {
    getPreventScrolling();
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);
  const [emailValue, setEmailValue] = useState("");
  const [pwValue, setPwValue] = useState("");
  const onEmailValue = (e) => {
    setEmailValue(e.target.value);
  };
  const onPwValue = (e) => {
    setPwValue(e.target.value);
  };
  const onLogin = async (e) => {
    try {
      const res = await axios.post(
        "http://3.39.164.180:8080/login",
        {
          username: emailValue,
          password: pwValue,
        }
        //  { withCredentials: true }
      );
      const { accessToken } = res.data.data;
      axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
      const payload = res.data.data;
      const decoded = jwt_decode(payload);
      console.log(decoded);
      var date = new Date(decoded.iat * 1000);
      console.log(date.toUTCString());
      var date1 = new Date(decoded.exp * 1000);
      console.log(date1.toUTCString());
      console.log(date.toLocaleString());
      console.log(date1.toLocaleString());
      localStorage.setItem("access", JSON.stringify(res.data.data));
      console.log(res.data.data);
      console.log(res);
      setLogin(true);
      onToggle();
      alert("로그인 성공?");
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
              value={emailValue}
              placeholder="E-MAIL"
            />
            <PwInput
              onChange={onPwValue}
              value={pwValue}
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
