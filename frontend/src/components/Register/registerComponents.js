import styled from "styled-components";

export const RegisterBottomSection = styled.section`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 1rem;
`;
export const RegisterBottomCancelBtn = styled.button`
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
`;
export const RegisterBottomOkBtn = styled.button`
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
`;
export const RegisterContainerDiv = styled.div`
  max-width: 1040px;
  display: flex;
  flex-direction: column;
  padding: 60px 16px;
  width: 1024px;
  margin: 0 auto;
  color: #333;
  grid-gap: 50px;
  gap: 50px;
  position: relative;
  @media (max-width: 500px) {
    width: 90%;
    padding: 30px 5px;
  }
`;
export const RegisterNumber1Title = styled.div`
  display: flex;
  align-items: center;
  padding: 16px;
  margin-bottom: 36px;
  border-bottom: 3px solid #f2f2f2;
`;
export const RegisterNumber1TitleText = styled.h2`
  font-weight: 700;
  font-size: 24px;
  line-height: 40px;
  letter-spacing: -0.05em;
  margin: 0;
  @media (max-width: 500px) {
    font-size: 18px;
  }
`;
export const RegisterNumber1TitleCircle = styled.span`
  margin-right: 8px;
  width: 28px;
  height: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background: #ffcd00;
  font-size: 16px;
  font-weight: 700;
  line-height: 19px;
  color: #fff;
`;
export const RegisterNumber1Ul = styled.ul`
  margin-top: 40px;
  display: flex;
  grid-gap: 15px;
  gap: 15px;
  list-style: none;
  @media (max-width: 500px) {
    flex-direction: column;
    padding: 5px;
  }
`;
export const RegisterNumber1Li = styled.li`
  flex: 1 1;
  padding: 0;
  margin: 0;
`;
export const RegisterNumber1Label = styled.label`
  display: inline-block;
  margin-bottom: 5px;
  color: #333;
  font-weight: 500;
`;
export const RegisterNumber1ContactInput = styled.input`
  width: 85.5%;
  height: 56px;
  min-height: 56px;
  line-height: 44px;
  box-shadow: none;
  padding-left: 16px;
  padding-right: 52px;
  border: 1px solid #e1e3e8;
  border-radius: 5px;
  font-size: 16px;
  font-weight: 500;
  margin-top: 20px;
  color: #333;
`;
export const RegisterNumber2Title = styled.div`
  display: flex;
  align-items: center;
  padding: 16px;
  margin-bottom: 36px;
  border-bottom: 3px solid #f2f2f2;
`;
export const RegisterNumber2TitleText = styled.h2`
  font-weight: 700;
  font-size: 24px;
  line-height: 40px;
  letter-spacing: -0.05em;
  margin: 0;
  @media (max-width: 500px) {
    font-size: 18px;
  }
`;
export const RegisterNumber2TitleCircle = styled.span`
  margin-right: 8px;
  width: 28px;
  height: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background: #ffcd00;
  font-size: 16px;
  font-weight: 700;
  line-height: 19px;
  color: #fff;
  @media (max-width: 500px) {
    width: 22px;
    height: 22px;
  }
`;
export const RegisterNumber2NameLabel = styled.label`
  display: inline-block;
  margin-bottom: 5px;
  color: #333;
  font-weight: 500;
`;
export const RegisterNumber2NameInput = styled.input`
  box-sizing: border-box;
  width: 100%;
  height: 56px;
  min-height: 56px;
  line-height: 44px;
  box-shadow: none;
  padding-left: 16px;
  padding-right: 52px;
  border: 1px solid #e1e3e8;
  border-radius: 5px;
  font-size: 16px;
  font-weight: 500;
  color: #333;
`;
