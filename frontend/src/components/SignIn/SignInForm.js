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
function SignInForm({ onToggle }) {
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
  const onLogin = async () => {
    try {
      const res = await axios.post("http://3.39.164.180:8080/login", {
        username: emailValue,
        password: pwValue,
      });
      console.log(res.data);
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
