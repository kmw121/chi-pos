import React, { useEffect } from "react";
import styled from "styled-components";
import { AiOutlineClose } from "react-icons/ai";
import getPreventScrolling from "../../util/getPreventScrolling";
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
  height: 100%;
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
`;
function SignInForm({ onToggle }) {
  useEffect(() => {
    getPreventScrolling();
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);
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
          <AiOutlineClose onClick={onToggle} style={{ cursor: "pointer" }} />
        </ModalHeader>
        <ModalMain>
          <ModalWelcome>Hola에 오신 것을 환영합니다!</ModalWelcome>
          <ModalInnerBox>
            {`HERE
              INPUT
              들어
              가요`}
          </ModalInnerBox>
        </ModalMain>
      </ModalContainer>
    </>
  );
}

export default SignInForm;
