import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MainHeadNav,
  MainHeadNavRight,
  MainHeadNavBtn,
  MainHeadDropdownContainer,
  MainHeadDropdownUl,
  MainHeadDropdownLi,
} from "../components";
import ModalPortal from "../../Portal/ModalPortal";
import SignInForm from "../SignIn/SignInForm";
import { useCookies } from "react-cookie";
import { logout } from "../../util/logout";
import { useDispatch, useSelector } from "react-redux";
function MainHead() {
  const [cookies, _, __] = useCookies(["jwtToken"]);
  const { userInfo } = useSelector((state) => {
    return state.user;
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
          <img
            alt="LOGO"
            src={"/logo/NextJs.png"}
            style={{
              width: "3rem",
              height: "3rem",
              display: "block",
              marginRight: "16px",
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
        </a>
        <MainHeadNavRight>
          <MainHeadNavBtn onClick={onGoToRegister}>새 글 쓰기</MainHeadNavBtn>
          {cookies.jwtToken !== undefined ? (
            <MainHeadNavBtn onClick={toggleDropdown}>
              <img
                alt="profile"
                src={
                  userInfo && userInfo.data.imageUrl === ""
                    ? //여기 next.js 로고는 디폴트값으로 쓸 이미지가 없어서 땜빵으로 넣어놓은 것입니다.
                      "/logo/NextJs.png"
                    : userInfo.data.imageUrl
                }
                style={{ width: "30px", height: "30px", borderRadius: "10px" }}
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
    </>
  );
}

export default MainHead;
