import styled from "styled-components";

export const SettingContainer = styled.div`
  padding-left: 1rem;
  padding-right: 1rem;
  margin-top: 3rem;
  margin-left: auto;
  margin-right: auto;
  width: 800px;
  padding-bottom: 5rem;
  @media (max-width: 500px) {
    width: 90%;
    margin-top: 10px;
  }
`;
export const SettingImgBox = styled.div`
  display: flex;
`;
export const SettingImg = styled.img`
  display: block;
  height: 10rem;
  width: 10rem;
  box-shadow: 0 0 8px rgb(0 0 0 / 9%);
  border-radius: 50%;
  object-fit: cover;
  transition: all 0.125s ease-in 0s;
  margin: 40px 0;
`;
export const SettingImgBtnBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  margin-left: 10px;
`;
export const SettingImgBtnBoxLabel = styled.label`
  background-color: #262626;
  color: #fff;
  border-radius: 4px;
  display: inline-block;
  cursor: pointer;
  text-align: center;
  padding-top: 4px;
  max-width: 7.5rem;
  width: 7.5rem;
  height: 2rem;
  font-weight: 500;
  margin: 5px;
`;
export const SettingImgBtnBoxSpan = styled.span`
  display: inline-block;
  vertical-align: middle;
  text-decoration: none;
`;
export const SettingImgBtnBoxInput = styled.input`
  display: none;
`;
export const SettingImgBtnBoxBtn = styled.button`
  width: 7.5rem;
  height: 2rem;
  font-size: 1rem;
  color: #fff;
  border-radius: 4px;
  background-color: #262626;
  margin: 5px 0 5px 5px;
  padding: 0;
  font-weight: 600;
  outline: none;
  border: none;
  cursor: pointer;
`;
export const SettingTitleBox = styled.div`
  display: flex;
  align-items: center;
`;
export const SettingTitleBoxInput = styled.input`
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: large;
  width: 18rem;
  min-height: 3rem;
  padding: 1rem;
  height: 2.5rem;
  outline: none;
  box-sizing: border-box;
  @media (max-width: 500px) {
    font-size: 12px;
    width: 100%;
  }
`;
export const SettingDescription = styled.p`
  margin-top: 0.875rem;
  color: #868e96;
  font-size: 0.875rem;
`;
export const SettingStackBox = styled.div`
  display: flex;
  align-items: center;
  margin-top: 3rem;
  width: 100%;
`;
export const SettingCompleteBtn = styled.button`
  font-weight: 700;
  color: #fff;
  border-radius: 4px;
  width: 100px;
  margin-right: 10px;
  height: 2rem;
  font-size: 1rem;
  margin-top: 1.5rem;
  background-color: #262626;
  outline: none;
  border: none;
  cursor: pointer;
`;
export const SettingWithdrawalBtn = styled.button`
  font-weight: 700;
  color: #fff;
  border-radius: 4px;
  width: 100px;
  margin-right: 10px;
  height: 2rem;
  font-size: 1rem;
  background: #ff3217;
  outline: none;
  border: none;
  cursor: pointer;
`;
export const SettingWarningMessage = styled.div`
  width: 100%;
  color: #ffa8a8;
  margin-left: 20px;
`;
