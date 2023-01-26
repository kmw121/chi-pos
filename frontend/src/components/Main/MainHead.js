import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MainHeadNav,
  MainHeadNavRight,
  MainHeadNavBtn,
  MainHeadDropdownContainer,
  MainHeadDropdownUl,
  MainHeadDropdownLi,
  MainHeadNavLeftImg,
  MainHeadRightImg,
} from "../components";
import ModalPortal from "../../Portal/ModalPortal";
import SignInForm from "../SignIn/SignInForm";
import { logout } from "../../util/logout";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPost } from "../../slice/userSlice";
import { ToastContainer } from "react-toastify";

function MainHead() {
  const { user } = useSelector((state) => {
    return state.user;
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onGoToRegister = () => {
    dispatch(setCurrentPost({}));
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
          <MainHeadNavLeftImg alt="LOGO" src={"/c-pos/ms-icon-310x310.png"} />
        </a>
        <MainHeadNavRight>
          <MainHeadNavBtn onClick={onGoToRegister}>새 글 쓰기</MainHeadNavBtn>
          {user && user.data.code === 1 ? (
            <MainHeadNavBtn onClick={toggleDropdown}>
              <MainHeadRightImg
                alt="profile"
                src={
                  user && user.data.data.imageUrl === "nonUrl"
                    ? "/c-pos/ms-icon-310x310.png"
                    : user && user.data.data.imageUrl
                }
              />
              {dropdownOpen && (
                <MainHeadDropdownContainer>
                  <MainHeadDropdownUl>
                    <MainHeadDropdownLi onClick={onGoToPosts}>
                      내 작성글
                    </MainHeadDropdownLi>
                    <MainHeadDropdownLi onClick={onGoToSetting}>
                      설정
                    </MainHeadDropdownLi>
                    <MainHeadDropdownLi
                      onClick={() => logout(dispatch, navigate)}
                    >
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
          <SignInForm onToggle={toggleModal} />
        </ModalPortal>
      )}
      <ToastContainer />
    </>
  );
}

export default MainHead;
