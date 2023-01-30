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
} from "./mainComponents";
import ModalPortal from "../../Portal/ModalPortal";
import SignInForm from "../SignIn/SignInForm";
import { logout } from "../../util/logout";
import { useDispatch, useSelector } from "react-redux";
import { setEditingPost } from "../../slice/userSlice";

function MainHead() {
  const { user } = useSelector((state) => {
    return state.user;
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onGoToRegister = () => {
    dispatch(setEditingPost({}));
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
      {" "}
      <MainHeadNav>
        <a href="/">
          <MainHeadNavLeftImg alt="LOGO" src={"/c-pos/ms-icon-310x310.png"} />
        </a>
        <MainHeadNavRight>
          {user && user.code !== undefined && user.code === 1 ? (
            <>
              <MainHeadNavBtn onClick={onGoToRegister}>
                새 글 쓰기
              </MainHeadNavBtn>
              <MainHeadNavBtn onClick={toggleDropdown}>
                <MainHeadRightImg
                  alt="profile"
                  src={
                    user && user.data.imageUrl === "nonUrl"
                      ? "/c-pos/ms-icon-310x310.png"
                      : user && user.data.imageUrl
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
            </>
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
    </>
  );
}

export default MainHead;
