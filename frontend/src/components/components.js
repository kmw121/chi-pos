import styled from "styled-components";

export const Banner = styled.div`
  width: 100%;
  height: 330px;
  background: orange;
  cursor: pointer;
`;
export const BannerDotsUl = styled.ul`
  display: block;
  width: 100%;
  padding: 0;
  margin: 0;
  list-style: none;
  text-align: center;
`;
export const BannerDotsLi = styled.li`
  width: 20px;
  height: 20px;
  cursor: pointer;
  position: relative;
  display: inline-block;
  margin: 0 5px;
  padding: 0;
`;
export const MainContentsMain = styled.main`
  max-width: 1200px;
  width: 100%;
  min-height: 60rem;
  padding: 0 10px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`;
export const MainContentsCategoryContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  margin-bottom: 2rem;
`;
export const MainContentsCategoryInnerContainer = styled.section`
  display: flex;
`;
export const MainContentsCategoryItem = styled.div`
  display: flex;
  align-items: center;
  margin-right: 1.5rem;
  cursor: pointer;
  font-weight: 700;
  font-size: 1.5rem;
`;
export const MainContentsToggle = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  right: 0;
`;
export const MainContentsToggleText = styled.span`
  color: #444;
  font-size: 24px;
  font-weight: 700;
  letter-spacing: -0.03em;
  margin-right: 20px;
`;
export const MainContentsToggleLabel = styled.label`
  position: relative;
  display: inline-block;
  height: 26px;
  width: 50px;
  border-radius: 50px;
  background-color: #ffcd00;
  cursor: pointer;
`;
export const MainContentsAppContainer = styled.div`
  margin: 0 auto;
`;
export const MainContentsAppStudyUl = styled.ul`
  display: flex;
  grid-gap: 35px;
  gap: 35px;
  flex-wrap: wrap;
  padding: 0;
  list-style: none;
`;
export const MainContentsAppStudyA = styled.a`
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  justify-content: center;
  padding: 70px 26px 26px 34px;
  width: 370px;
  height: 450px;
  background: #fff;
  border: 2px solid #d1d1d1;
  border-radius: 30px;
  position: relative;
  cursor: pointer;
  transition: 0.2s ease-in;
`;
export const MainContentsAppStudyLi = styled.li`
  padding: 0;
  margin: 0;
`;
export const MainContentsAppSchedule = styled.div`
  display: flex;
  font-size: 18px;
  grid-gap: 10px;
  gap: 10px;
  color: rgba(0, 0, 0, 0.4);
`;
export const MainContentsAppStudyTitle = styled.h1`
  font-size: 24px;
  min-height: 76px;
  line-height: 36px;
  font-weight: 400;
  letter-spacing: -0.04em;
  margin: 16px 0;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  word-break: break-all;
  overflow: hidden;
`;
export const MainContentsAppStudyTag = styled.ul`
  display: flex;
  grid-gap: 5px;
  gap: 5px;
  font-size: 16px;
  color: rgba(0, 0, 0, 0.4);
  min-height: 30px;
  margin-bottom: 40px;
  list-style: none;
  padding: 0;
`;
export const MainContentsAppStudyTagLi = styled.li`
  padding: 0;
  margin: 0;
`;
export const MainContentsAppStudyImgUl = styled.ul`
  margin-bottom: 42px;
  padding: 0;
  display: flex;
  grid-gap: 12px;
  gap: 30px;
  list-style: none;
`;
export const MainContentsAppStudyImgLi = styled.li`
  width: 48px;
  height: 48px;
`;
export const MainContentsAppStudyInfo = styled.section`
  display: flex;
  font-size: 18px;
  justify-content: space-between;
  border-top: 2px solid #f2f2f2;
  padding-top: 16px;
`;

export const MainHeadNav = styled.nav`
  margin: auto;
  max-width: 1180px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 85px;
  padding: 0 10px;
`;
export const MainHeadNavRight = styled.div`
  display: flex;
  gap: 30px;
  align-items: center;
`;
export const MainHeadNavBtn = styled.button`
  cursor: pointer;
  font-weight: 600;
  font-size: 1.125rem;
  outline: none;
  border: none;
  background-color: #fff;
`;
export const SectionContainer = styled.section`
  max-width: 1200px;
  width: 100%;
  padding: 0 15px;
  margin: 104px auto;
`;
export const CategoryUl = styled.ul`
  display: flex;
  grid-gap: 50px;
  gap: 50px;
  border-bottom: 3px solid #f2f2f2;
  padding-bottom: 20px;
  padding-left: 16px;
  margin-bottom: 30px;
`;
export const CategoryLi = styled.li`
  display: flex;
  font-weight: 700;
  font-size: 26px;
  line-height: 126.5%;
  color: #848484
  cursor: pointer;
  position: relative;
  ${(props) =>
    props.isSelected &&
    `
      background-color: white;
      color: black;
    `}
c

  `;
export const CategoryLiAfter = styled.div`
  content: "";
  position: absolute;
  height: 5px;
  width: calc(100% + 26px);
  background: #ffe579;
  left: -13px;
  bottom: -22px;
  cursor: default;
`;
export const StackBtnUl = styled.ul`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  grid-gap: 15px;
  gap: 15px;
  margin-bottom: 40px;
`;
export const StackBtnLi = styled.li`
  display: flex;
  grid-gap: 10px;
  gap: 10px;
  align-items: center;
  border: 1px solid #d0d0d0;
  border-radius: 100px;
  padding: 12px 20px 12px 15px;
  transition: all 0.1s ease-in;
  cursor: pointer;
`;
export const SelectedStackContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  grid-gap: 30px;
  gap: 30px;
`;
export const SelectedStackUl = styled.ul`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  grid-gap: 30px;
  gap: 30px;
`;
export const SelectedStackLi = styled.li`
  display: flex;
  grid-gap: 10px;
  gap: 10px;
  background: #f2f2f2;
  padding: 8px 15px;
  height: 41px;
  border-radius: 10px;
  font-weight: 500;
  font-size: 20px;
  color: #313131;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.1s ease-in;
`;
export const SelectedFilterClear = styled.span`
  font-size: 24px;
  color: #333;
  cursor: pointer;
`;
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