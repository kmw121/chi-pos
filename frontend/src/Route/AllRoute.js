import React from "react";
import MainPage from "../components/Main/MainPage";
import RegisterPage from "../components/Register/RegisterPage";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import SignUpPage from "../components/SignUp/SignUpPage";
import MyPostsPage from "../components/MyPosts/MyPostsPage";
import Setting from "../components/Setting/Setting";
import StudyPage from "../components/Study/StudyPage";
function AllRoute({ login, setLogin }) {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<MainPage login={login} setLogin={setLogin} />}
        />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/myPosts" element={<MyPostsPage />} />
        <Route path="/setting" element={<Setting />} />
        <Route path="/study/:id" element={<StudyPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AllRoute;
