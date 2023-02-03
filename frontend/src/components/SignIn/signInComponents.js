import styled, { keyframes } from "styled-components";

export const boxFade = keyframes`
0% {
  opacity: 0;
  transform: translate(-50%, -100%);
}
100% {
  opacity: 1;
  transform: translate(-50%, -50%);
}
`;
export const ModalBackground = styled.div`
  box-sizing: border-box;
  display: block;
  position: fixed;
  inset: 0px;
  background: rgba(77, 77, 77, 0.5);
  z-index: 999;
`;
export const ModalContainer = styled.div`
  width: 800px;
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 9%);
  position: absolute;
  display: flex;
  flex-direction: column;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 0 auto;
  z-index: 1000;
  animation: ${boxFade} 0.3s linear;
  @media (max-width: 550px) {
    width: 300px;
  }
  @media (min-width: 501px) and (max-width: 800px) {
    width: 400px;
  }
`;
export const ModalHeader = styled.div`
  background: #f8f9fa;
  padding: 0 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 8px 8px 0 0;
  height: 3rem;
  @media (max-width: 550px) {
    padding: 0 5 px;
    height: 45px;
  }
  @media (min-width: 501px) and (max-width: 800px) {
    padding: 0 5px;
    height: 50px;
  }
`;
export const ModalLogoImg = styled.img`
  width: 30px;
  height: 30px;
  @media (max-width: 550px) {
    width: 26px;
    height: 26px;
  }
`;
export const ModalMain = styled.div`
  background: #fff;
  height: 70%;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const ModalWelcome = styled.h1`
  display: block;
  font-size: 2em;
  font-weight: bold;
  @media (max-width: 500px) {
    font-size: 20px;
  }
  @media (min-width: 501px) and (max-width: 800px) {
    font-size: 22px;
  }
`;
export const ModalInnerBox = styled.div`
  margin-top: 4rem;
  width: 60%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  @media (max-width: 500px) {
    margin-top: 10px;
    width: 135%;
  }
`;
export const IdInput = styled.input`
  width: 70%;
  height: 38px;
  font-size: 18px;
  border: 0;
  border-radius: 8px;
  outline: none;
  padding-left: 10px;
  background-color: rgb(233, 233, 233);
  margin-bottom: 15px;
  text-align: center;
  @media (max-width: 500px) {
    margin-bottom: 15px;
    font-size: 13px;
    width: 70%;
    height: 30px;
  }
  @media (min-width: 501px) and (max-width: 800px) {
    font-size: 13px;
    height: 30px;
  }
`;
export const PwInput = styled.input`
  width: 70%;
  height: 38px;
  font-size: 18px;
  border: 0;
  border-radius: 8px;
  outline: none;
  padding-left: 10px;
  background-color: rgb(233, 233, 233);
  text-align: center;
  margin-bottom: 15px;
  @media (max-width: 500px) {
    margin-bottom: 15px;
    font-size: 13px;
    height: 30px;
  }
  @media (min-width: 501px) and (max-width: 800px) {
    height: 30px;
    font-size: 13px;
  }
`;
export const ModalBottomSection = styled.section`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 1rem;
  @media (max-width: 500px) {
    margin-top: 10px;
  }
`;
export const ModalBottomCancelBtn = styled.button`
  cursor: pointer;
  outline: none;
  border: none;
  border-radius: 4px;
  padding: 0 1.25rem;
  height: 2rem;
  font-size: 1rem;
  background: #e9ecef;
  color: #495057;
  margin-right: 1rem;
  @media (max-width: 500px) {
    font-size: 12px;
  }
`;
export const ModalBottomOkBtn = styled.button`
  font-weight: 700;
  background-color: #262626;
  color: #fff;
  cursor: pointer;
  outline: none;
  border: none;
  border-radius: 4px;
  padding: 0 1.25rem;
  height: 2rem;
  font-size: 1rem;
  @media (max-width: 500px) {
    font-size: 12px;
  }
`;
export const ModalBtnContainer = styled.section`
  margin-top: 4rem;
  display: flex;
  align-items: center;
  width: 60%;
  justify-content: center;
  @media (max-width: 500px) {
    margin-top: 30px;
  }
`;
export const ModalBtnBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const ModalBtnKakao = styled.a`
  margin-top: 14px;
  height: 50px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
  transition: all 0.125s ease-in 0s;
  color: #fff;
  box-shadow: 0 5px 25px rgb(0 0 0 / 15%);
  background-color: #fae100;
  border: none;
  @media (max-width: 500px) {
    width: 250px;
    height: 40px;
  }
`;
export const ModalBtnKakaoIcon = styled.img`
  @media (max-width: 500px) {
    width: 250px;
    height: 40px;
  }
`;
export const ModalInputValueInvalid = styled.div`
  margin-bottom: 15px;
  color: #ffa8a8;
  font-weight: bold;
`;
