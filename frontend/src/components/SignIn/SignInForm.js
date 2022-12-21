import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { AiOutlineClose } from "react-icons/ai";
import getPreventScrolling from "../../util/getPreventScrolling";
import {
  RegisterBottomCancelBtn,
  RegisterBottomSection,
  RegisterBottomOkBtn,
} from "../components";
const boxFade = keyframes`
0% {
  opacity: 0;
  transform: translate(-50%, -100%);
}
100% {
  opacity: 1;
  transform: translate(-50%, -50%);
}
`;
const ModalBackground = styled.div`
  box-sizing: border-box;
  display: block;
  position: fixed;
  inset: 0px;
  background: rgba(77, 77, 77, 0.5);
  z-index: 999;
`;
const ModalContainer = styled.div`
  width: 800px;
  height: 550px;
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 9%);
  position: absolute;
  display: flex;
  flex-direction: column;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 0 auto;
  z-index: 1000;
  animation: ${boxFade} 0.3s linear;
`;
const ModalHeader = styled.div`
  background: #f8f9fa;
  padding: 0 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 8px 8px 0 0;
  height: 3rem;
`;
const ModalMain = styled.div`
  background: #fff;
  height: 70%;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const ModalWelcome = styled.h1`
  display: block;
  font-size: 2em;
  margin-block-start: 0.67em;
  margin-block-end: 0.67em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  font-weight: bold;
`;
const ModalInnerBox = styled.div`
  margin-top: 4rem;
  width: 60%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
`;
const IdInput = styled.input`
  width: 70%;
  height: 38px;
  font-size: 18px;
  border: 0;
  border-radius: 8px;
  outline: none;
  padding-left: 10px;
  background-color: rgb(233, 233, 233);
  margin-bottom: 30px;
  text-align: center;
`;
const PwInput = styled.input`
  width: 70%;
  height: 38px;
  font-size: 18px;
  border: 0;
  border-radius: 8px;
  outline: none;
  padding-left: 10px;
  background-color: rgb(233, 233, 233);
  text-align: center;
  margin-bottom: 40px;
`;
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
            <RegisterBottomOkBtn>로그인</RegisterBottomOkBtn>
          </RegisterBottomSection>
        </ModalMain>
      </ModalContainer>
    </>
  );
}

export default SignInForm;
