import styled from "styled-components";

export const GoogleBtn = styled.div`
  width: 100%;
  height: 45px;
  background-color: #4285f4;
  box-shadow: 0 3px 4px 0 rgba(0, 0, 0, 0.25);
  cursor: pointer;
  margin-bottom: 14px;
  display: flex;
  border-radius: 10px;
  @media (max-width: 500px) {
    width: 250px;
    height: 40px;
  }
`;
export const GoogleIconWrapper = styled.div`
  margin-top: 1px;
  margin-left: 1px;
  width: 42px;
  height: 42px;
  background-color: #fff;
  border-radius: 10px;
  @media (max-width: 500px) {
    width: 38px;
    height: 38px;
  }
`;
export const GoogleIconImg = styled.img`
  position: absolute;
  margin-top: 11px;
  margin-left: 11px;
  width: 24px;
  height: 24px;
  @media (max-width: 500px) {
    width: 18px;
    height: 18px;
  }
`;
export const GoogleBtnText = styled.p`
  color: #fff;
  margin-left: 62px;
  font-size: 15px;
  font-weight: 700;
  @media (max-width: 500px) {
    font-size: 13px;
  }
`;
export const ImgPreview = styled.img`
  width: 60px;
  height: 60px;
`;
export const KakaoSocialBox = styled.div`
  position: fixed;
  top: "50%";
  left: "50%";
  transform: "translate(-50%, -50%)";
`;
