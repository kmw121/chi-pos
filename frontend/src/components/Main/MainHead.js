import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MainHeadNav, MainHeadNavRight, MainHeadNavBtn } from "../components";
import ModalPortal from "../../Portal/ModalPortal";
import SignInForm from "../SignIn/SignInForm";

function MainHead() {
  const navigate = useNavigate();
  const onGoToRegister = () => {
    navigate("/register");
  };
  const onGoToSignUp = () => {
    navigate("/signup");
  };
  const [modalOpen, setModalOpen] = useState(false);
  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };
  return (
    <>
      <MainHeadNav>
        <a href="/">
          <img alt="LOGO" src={"favicon.ico"} />
        </a>
        <MainHeadNavRight>
          <MainHeadNavBtn onClick={onGoToRegister}>새 글 쓰기</MainHeadNavBtn>
          <MainHeadNavBtn onClick={onGoToSignUp}>회원가입</MainHeadNavBtn>
          <MainHeadNavBtn onClick={toggleModal}>로그인</MainHeadNavBtn>
        </MainHeadNavRight>
      </MainHeadNav>
      {modalOpen && (
        <ModalPortal>
          <SignInForm onToggle={toggleModal} />
        </ModalPortal>
      )}
    </>
  );
}

export default MainHead;
