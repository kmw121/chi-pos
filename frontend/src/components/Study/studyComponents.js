import styled, { keyframes } from "styled-components";

export const StudyContainer = styled.div`
  max-width: 900px;
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  padding: 1.5rem 1.5rem 5rem;
  @media (max-width: 500px) {
    width: 80%;
  }
  @media (min-width: 501px) and (max-width: 800px) {
    width: 80%;
  }
`;
export const StudyHeadSection = styled.section`
  display: flex;
  flex-direction: column;
  margin-top: 3rem;
  @media (max-width: 500px) {
    margin-top: 20px;
  }
  @media (min-width: 501px) and (max-width: 800px) {
    margin-top: 20px;
  }
`;
export const StudyHeadTitle = styled.div`
  margin-top: 2.5rem;
  font-weight: 800;
  font-size: 3rem;
  line-height: 126.5%;
  letter-spacing: -0.005em;
  color: #000;
  @media (max-width: 500px) {
    font-size: 1.5rem;
    margin-top: 20px;
  }
  @media (min-width: 501px) and (max-width: 800px) {
    font-size: 1.6rem;
    margin-top: 20px;
  }
`;
export const StudyHeadUserAndDate = styled.div`
  margin-top: 32px;
  padding-bottom: 32px;
  border-bottom: 3px solid #f2f2f2;
  display: flex;
  grid-gap: 15px;
  gap: 15px;
  align-items: center;
`;
export const StudyHeadUserBox = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;
export const StudyHeadUserBoxImg = styled.img`
  width: 3rem;
  height: 3rem;
  display: block;
  margin-right: 16px;
  border-radius: 50%;
  object-fit: cover;
  @media (max-width: 500px) {
    width: 2rem;
    height: 2rem;
    margin-right: 12px;
  }
  @media (min-width: 501px) and (max-width: 800px) {
    width: 2rem;
    height: 2rem;
    margin-right: 12px;
  }
`;
export const StudyHeadUserName = styled.div`
  color: #333;
  cursor: pointer;
  font-size: 18px;
  font-weight: 700;
  padding-right: 15px;
  border-right: 2px solid #e1e1e1;
  @media (max-width: 500px) {
    font-size: 1rem;
  }
  @media (min-width: 501px) and (max-width: 800px) {
    font-size: 1rem;
  }
`;
export const StudyHeadRegisterDate = styled.div`
  font-size: 18px;
  color: #717171;
  @media (max-width: 500px) {
    font-size: 1rem;
  }
  @media (min-width: 501px) and (max-width: 800px) {
    font-size: 1rem;
  }
`;
export const StudyInfoGridUl = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, 3fr);
  grid-row-gap: 24px;
  row-gap: 24px;
  margin-top: 60px;
  list-style: none;
  @media (max-width: 500px) {
    grid-template-columns: repeat(1, 6fr);
    padding: 0;
    row-gap: 12px;
  }
  @media (min-width: 501px) and (max-width: 800px) {
    grid-template-columns: repeat(1, 6fr);
    padding: 0;
    row-gap: 12px;
  }
`;
export const StudyInfoGridLi = styled.li`
  display: flex;
  position: relative;
  align-items: center;
  font-weight: 700;
  font-size: 20px;
`;
export const StudyInfoGridTitle = styled.span`
  color: #717171;
  margin-right: 40px;
  @media (max-width: 500px) {
    font-size: 16px;
  }
`;
export const StudyInfoGridContent = styled.span`
  color: #333;
  @media (max-width: 500px) {
    font-size: 16px;
  }
`;
export const StudyInfoGridA = styled.a`
  display: flex;
  grid-gap: 8px;
  gap: 8px;
  font-size: 16px;
  padding: 8px 12px;
  text-decoration-color: #4a5e75;
  font-weight: 700;
  text-decoration-line: underline;
  background: #f2f4f8;
  border-radius: 10px;
  color: inherit;
`;
export const StudyProjectBox = styled.div`
  margin-top: 132px;
  font-size: 1.125rem;
  word-break: break-all;
  line-height: 1.7;
  letter-spacing: -0.004em;
`;
export const StudyProjectInfo = styled.h2`
  margin: 0;
  color: #333;
  font-size: 26px;
  font-weight: 700;
  padding-bottom: 24px;
  border-bottom: 3px solid #f2f2f2;
  @media (max-width: 500px) {
    font-size: 20px;
  }
`;
export const StudyProjectDetail = styled.div`
  width: 100%;
  margin: 40px auto 0;
`;
export const StudyCommentBox = styled.section`
  display: flex;
  flex-direction: column;
  background: #fff;
`;
export const StudyCommentInnerBox = styled.div`
  width: 100%;
  margin: 0 auto;
`;
export const StudyCommentInputBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 100px;
`;
export const StudyCommentInputCount = styled.h1`
  margin: 0 0 30px;
  font-size: 22px;
`;
export const StudyCommentInputText = styled.textarea`
  font-family: inherit;
  padding: 1rem 1rem 1.5rem;
  outline: none;
  border: 2px solid #e1e1e1;
  border-radius: 16px;
  min-height: 100px;
  margin-bottom: 10px;
  resize: none;
`;
export const StudyButtonBox = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 16px 0 24px;
`;
export const StudyButton = styled.div`
  min-width: 120px;
  height: 40px;
  background: #333;
  border-radius: 50px;
  font-weight: 700;
  color: #fff;
  font-size: 16px;
  text-align: center;
  cursor: pointer;
  outline: none;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StudyAuthBtnSection = styled.section`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  gap: 5px;
`;
export const StudyAuthBtn = styled.button`
  font-size: 16px;
  color: #444;
  outline: none;
  border: none;
  background-color: #fff;
  cursor: pointer;
`;
export const StudyCommentUl = styled.ul`
  width: 100%;
  box-sizing: border-box;
  @media (max-width: 500px) {
    padding: 0;
  }
`;
export const StudyCommentLi = styled.li`
  display: flex;
  flex-direction: column;
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 2px solid #e1e1e1;
  box-sizing: border-box;
`;
export const StudyCommentHead = styled.section`
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
`;
export const StudyCommentHeadBox = styled.div`
  display: flex;
  align-items: center;
  box-sizing: border-box;
`;
export const StudyCommentHeadImg = styled.img`
  display: block;
  width: 52px;
  height: 52px;
  margin-right: 16px;
  border-radius: 50%;
  object-fit: cover;
  box-sizing: border-box;
  @media (max-width: 500px) {
    width: 30px;
    height: 30px;
  }
`;
export const StudyCommentHeadNameDateBox = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
`;
export const StudyCommentHeadName = styled.div`
  color: #333;
  font-weight: 700;
  box-sizing: border-box;
`;
export const StudyCommentHeadDate = styled.div`
  font-size: 14px;
  line-height: 126.5%;
  letter-spacing: -0.005em;
  box-sizing: border-box;
  color: #9f9f9f;
  @media (max-width: 500px) {
    font-size: 12px;
  }
`;
export const StudyCommentMain = styled.section`
  font-size: 1.125rem;
  line-height: 1.7;
  letter-spacing: -0.004em;
  word-break: break-all;
  box-sizing: border-box;
  overflow-wrap: break-word;
`;
export const StudyCommentMainText = styled.p`
  font-size: 1.125rem;
  line-height: 1.7;
  letter-spacing: -0.004em;
  word-break: break-all;
  box-sizing: border-box;
  overflow-wrap: break-word;
  @media (max-width: 500px) {
    font-size: 1rem;
  }
`;

export const StudyPendingCOntainer = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  overflow: hidden;
  background: white;
  z-index: 9999;
  opacity: 0.5;
`;
export const rotate_image = keyframes`
100% {
  transform: rotate(360deg)
}
`;
export const StudyPendingImg = styled.img`
  animation: ${rotate_image} 1s linear infinite;
  transform-origin: 50% 50%;
  width: 250px;
  height: 250px;
  position: absolute;
  top: 20%;
  left: 40%;
`;
