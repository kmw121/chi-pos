import React from "react";
import MainPage from "../components/Main/MainPage";
import RegisterPage from "../components/Register/RegisterPage";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import SignUpPage from "../components/SignUp/SignUpPage";
import MyPostsPage from "../components/MyPosts/MyPostsPage";
import Setting from "../components/Setting/Setting";
import StudyPage from "../components/Study/StudyPage";
import KakaoSocial from "../components/Kakao/KakaoSocial";
import KakaoSignUp from "../components/Kakao/KakaoSignUp";
import GoogleSignUp from "../components/Google/GoogleSignUp";
function AllRoute() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/myPosts" element={<MyPostsPage />} />
        <Route path="/setting" element={<Setting />} />
        <Route path="/study/:id" element={<StudyPage />} />
        <Route path="/oauth/callback/kakao" element={<KakaoSocial />} />
        <Route path="/kakaoSignup" element={<KakaoSignUp />} />
        <Route path="/googleSignup" element={<GoogleSignUp />} />
        <Route path="/myPosts/study/:id" element={<StudyPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AllRoute;
