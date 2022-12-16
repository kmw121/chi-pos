import React from "react";
import MainPage from "../Main/MainPage";
import RegisterPage from "../Register/RegisterPage";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import SignUpPage from "../SignUp/SignUpPage";
function AllRoute() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AllRoute;
