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
import SignInForm from "../SignIn/SignInForm";
import ModalPortal from "../../Portal/ModalPortal";
import { logout } from "../../util/logout";
import { useDispatch, useSelector } from "react-redux";
import { setEditingPost, setModalOpen } from "../../slice/userSlice";
import postLogin from "../../util/postLogin";
import { toast } from "react-toastify";

function MainHead() {
  const { user, modalOpen } = useSelector((state) => {
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
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  const handleTestAccount = async () => {
    try {
      await postLogin(
        {
          username: "test@chi.pos",
          password: "12345",
        },
        dispatch,
        navigate,
        false
      );
    } catch (err) {
      toast.error("테스트 계정으로 로그인이 실패하였습니다.");
      throw new Error(err);
    }
  };
  const toggleModal = () => {
    dispatch(setModalOpen(!modalOpen));
  };
  return (
    <>
      <MainHeadNav>
        <a href="/">
          <MainHeadNavLeftImg alt="LOGO" src={"/c-pos/ms-icon-310x310.png"} />
        </a>
        <MainHeadNavRight>
          {user && user.code !== undefined && user.code === 1 ? (
            <>
              <MainHeadNavBtn
                toggleModal={toggleModal}
                onClick={onGoToRegister}
              >
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
              <MainHeadNavBtn onClick={handleTestAccount}>
                둘러보기
              </MainHeadNavBtn>
              <MainHeadNavBtn onClick={onGoToSignUp}>회원가입</MainHeadNavBtn>
              <MainHeadNavBtn onClick={toggleModal}>로그인</MainHeadNavBtn>
            </>
          )}
        </MainHeadNavRight>
      </MainHeadNav>
      {modalOpen && (
        <ModalPortal>
          <SignInForm />
        </ModalPortal>
      )}
    </>
  );
}

export default MainHead;
