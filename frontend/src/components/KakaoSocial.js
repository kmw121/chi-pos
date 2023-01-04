import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { API_URL } from "../util/API_URL";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
const KakaoSocial = () => {
  let code = new URL(window.location.href).searchParams.get("code");
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(API_URL + `/ouath/kakao?code=${code}`);
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);
  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <ClimbingBoxLoader color="#ffe8cc" loading size="30" />
      <h1>로딩즁...</h1>
    </div>
  );
};
export default KakaoSocial;
