import React, { useEffect } from "react";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { KakaoSocialBox } from "../Google/socialButton";
import getKakaoAuth from "../../util/getKakaoAuth";
import { toast } from "react-toastify";

function KakaoSocial({ onToggle }) {
  let code = new URL(window.location.href).searchParams.get("code");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchData() {
      try {
        await getKakaoAuth(code, dispatch, navigate);
        onToggle();
      } catch {
        toast.error("오류로 인하여 카카오 로그인에 실패하였습니다.");
        onToggle();
      }
    }
    fetchData();
  }, []);
  return (
    <KakaoSocialBox>
      <ClimbingBoxLoader color="#ffe8cc" loading size="30" />
      <h1>잠시만 기다려 주세요</h1>
    </KakaoSocialBox>
  );
}
export default KakaoSocial;
