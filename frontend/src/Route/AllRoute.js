import React, { useState } from "react";
import MainPage from "../components/Main/MainPage";
import RegisterPage from "../components/Register/RegisterPage";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import SignUpPage from "../components/SignUp/SignUpPage";
import MyPostsPage from "../components/MyPosts/MyPostsPage";
import StudyPage from "../components/Study/StudyPage";
import KakaoSocial from "../components/Kakao/KakaoSocial";
import SettingPage from "../components/Setting/SettingPage";
import KakaoSignUpPage from "../components/Kakao/KakaoSignUpPage";
import GoogleSignUpPage from "../components/Google/GoogleSignUpPage";
function AllRoute() {
  const [modalOpen, setModalOpen] = useState(false);
  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <MainPage
              modalOpen={modalOpen}
              setModalOpen={setModalOpen}
              toggleModal={toggleModal}
            />
          }
        />
        {/* login X  */}
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/signup"
          element={
            <SignUpPage modalOpen={modalOpen} toggleModal={toggleModal} />
          }
        />
        <Route path="/myPosts" element={<MyPostsPage />} />
        <Route path="/setting" element={<SettingPage />} />
        <Route
          path="/study/:id"
          element={
            <StudyPage modalOpen={modalOpen} toggleModal={toggleModal} />
          }
        />
        <Route path="/oauth/callback/kakao" element={<KakaoSocial />} />
        <Route
          path="/kakaoSignup"
          element={
            <KakaoSignUpPage modalOpen={modalOpen} toggleModal={toggleModal} />
          }
        />
        <Route
          path="/googleSignup"
          element={
            <GoogleSignUpPage modalOpen={modalOpen} toggleModal={toggleModal} />
          }
        />
        <Route
          path="/myPosts/study/:id"
          element={
            <StudyPage modalOpen={modalOpen} toggleModal={toggleModal} />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default AllRoute;
