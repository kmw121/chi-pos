import React from "react";
import { useNavigate } from "react-router-dom";
import { MainHeadNav, MainHeadNavRight, MainHeadNavBtn } from "../components";
function MainHead() {
  const onClick = () => {
    alert("어쩔티비");
  };
  const navigate = useNavigate();
  const onGoToRegister = () => {
    navigate("/register");
  };
  return (
    <MainHeadNav>
      <a href="/">
        <img alt="LOGO" src={"favicon.ico"} />
      </a>
      <MainHeadNavRight>
        <MainHeadNavBtn onClick={onGoToRegister}>새 글 쓰기</MainHeadNavBtn>
        <MainHeadNavBtn onClick={onClick}>로그인</MainHeadNavBtn>
      </MainHeadNavRight>
    </MainHeadNav>
  );
}

export default MainHead;
