import styled from "styled-components";

export const SignUpInput = styled.input`
  width: 80%;
  height: 40px;
  font-size: 20px;
  padding-left: 15px;
  margin-bottom: 10px;
  margin-top: 10px;
  display: flex;
  justify-content: center;
  @media (max-width: 500px) {
    font-size: 12px;
    height: 20px;
  }
`;
export const SignUpInputContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;
export const SignUpInputImg = styled.input`
  height: 40px;
  font-size: 20px;
  padding-left: 15px;
  margin-bottom: 10px;
  margin-top: 10px;
  display: flex;
  justify-content: center;
`;
export const SignUpImgPreview = styled.img`
  width: 60px;
  height: 60px;
`;
export const SignUpFormTitle = styled.div`
  display: flex;
  align-items: center;
  padding: 16px;
  border-bottom: 3px solid #f2f2f2;
  @media (max-width: 500px) {
    padding: 5px;
  }
`;
export const SignUpFormLabel = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
  color: #333;
  font-weight: 500;
`;

export const SignUpFormUl = styled.ul`
  display: flex;
  grid-gap: 15px;
  gap: 65px;
  list-style: none;
  @media (max-width: 500px) {
    padding: 0 5px;
    gap: 10px;
  }
`;
export const SignUpFormLi = styled.li`
  display: flex;
  flex-direction: column;
  flex: 1 1;
  margin: 0;
  width: 50%;
`;
