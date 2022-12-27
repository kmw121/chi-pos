import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MainHeadNav,
  MainHeadNavRight,
  MainHeadNavBtn,
  MainHeadDropdownContainer,
  MainHeadDropdownUl,
  MainHeadDropdownA,
  MainHeadDropdownLi,
} from "../components";
import ModalPortal from "../../Portal/ModalPortal";
import SignInForm from "../SignIn/SignInForm";
import { useCookies } from "react-cookie";
import { logout } from "../../util/logout";
function MainHead({ login, setLogin }) {
  const [cookies, setCookies, removeCookie] = useCookies(["jwtToken"]);
  const [refresh, setRefresh, removeRefresh] = useCookies(["refreshToken"]);
  const navigate = useNavigate();
  const onGoToRegister = () => {
    navigate("/register");
  };
  const onGoToSignUp = () => {
    navigate("/signup");
  };
  const onGoToSetting = () => {
    navigate("/setting");
  };
  const onGoToPosts = () => {
    navigate("/myPosts");
  };
  const [modalOpen, setModalOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  return (
    <>
      <MainHeadNav>
        <a href="/">
          <img alt="LOGO" src={"favicon.ico"} />
        </a>
        <MainHeadNavRight>
          <MainHeadNavBtn onClick={onGoToRegister}>새 글 쓰기</MainHeadNavBtn>
          {cookies.jwtToken !== undefined ? (
            <MainHeadNavBtn onClick={toggleDropdown}>
              이미지 들어갈 자리입니다.
              {dropdownOpen && (
                <MainHeadDropdownContainer>
                  <MainHeadDropdownUl>
                    <MainHeadDropdownLi onClick={onGoToPosts}>
                      내 작성글
                    </MainHeadDropdownLi>
                    <MainHeadDropdownLi onClick={onGoToSetting}>
                      설정
                    </MainHeadDropdownLi>
                    <MainHeadDropdownLi onClick={logout}>
                      로그아웃
                    </MainHeadDropdownLi>
                  </MainHeadDropdownUl>
                </MainHeadDropdownContainer>
              )}
            </MainHeadNavBtn>
          ) : (
            <>
              <MainHeadNavBtn onClick={onGoToSignUp}>회원가입</MainHeadNavBtn>
              <MainHeadNavBtn onClick={toggleModal}>로그인</MainHeadNavBtn>
            </>
          )}
        </MainHeadNavRight>
      </MainHeadNav>
      {modalOpen && (
        <ModalPortal>
          <SignInForm
            login={login}
            setLogin={setLogin}
            onToggle={toggleModal}
          />
        </ModalPortal>
      )}
    </>
  );
}

export default MainHead;
