import styled, { keyframes } from "styled-components";
export const Banner_Animation = keyframes`
from {
  -webkit-filter: hue-rotate(0);
  -moz-filter: hue-rotate(0);
  -ms-filter: hue-rotate(0);
  filter: hue-rotate(0);
}
to {
  -webkit-filter: hue-rotate(360deg);
  -moz-filter: hue-rotate(360deg);
  -ms-filter: hue-rotate(360deg);
  filter: hue-rotate(360deg);
}

`;
export const Banner = styled.img`
  width: 100vw;
  height: 330px;
  background: thistle;
  cursor: pointer;
  background-size: cover;
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
  color: #848484;
  ${(props) =>
    props.isSelected &&
    `
      background-color: white;
      color: black;
    `}
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
  position: absolute;
  top: 0;
  right: 0;
  width: 50px;
  height: 26px;
  border-radius: 15px;
  background: #bebebe;
  cursor: pointer;
  &::after {
    content: "";
    display: block;
    border-radius: 50%;
    width: 18px;
    height: 18px;
    margin: 3px;
    background: #ffffff;
    box-shadow: 1px 3px 3px 1px rgba(0, 0, 0, 0.2);
    transition: 0.3s;
  }
`;
export const MainContentsToggleInput = styled.input`
  opacity: 0;
  z-index: 1;
  border-radius: 15px;
  width: 50px;
  height: 26px;
  &:checked + ${MainContentsToggleLabel} {
    background: #ffcd00;
    &::after {
      content: "";
      display: block;
      border-radius: 50%;
      width: 18px;
      height: 18px;
      margin-left: 27px;
      transition: 0.3s;
    }
  }
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
  text-decoration: none !important;
  color: inherit;
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
  text-decoration: none;
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
export const MainContentsAppStudyInfoUserBox = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;
export const MainContentsAppStudyInfoUserName = styled.div`
  font-size: 18px;
  font-weight: 400;
`;
export const MainContentsAppStudyInfoRightBox = styled.div`
  display: flex;
  grid-gap: 12px;
  gap: 12px;
`;
export const MainContentsAppStudyInfoRightDetail = styled.div`
  display: flex;
  align-items: center;
  color: #999;
  grid-gap: 6px;
  gap: 6px;
`;
export const MainContentsAppStudyEmptyBox = styled.ul`
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  justify-content: center;
  padding: 30px 20px 20px 30px;
  width: 370px;
  height: 450px;
  background: #fff;
  border: 2px solid #d1d1d1;
  border-radius: 30px;
  position: relative;
  cursor: pointer;
  transition: 0.2s ease-in;
  text-decoration: none !important;
  color: inherit;
  list-style: none;
`;
export const MainContentsAppStudyEmtpyBoxInner = styled.li`
  background: #ced4da;
  border-radius: 30px;
  height: 100%;
  opacity: 0.5;
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
  position: relative;
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
export const SignUpFormTitle = styled.div`
  display: flex;
  align-items: center;
  padding: 16px;
  border-bottom: 3px solid #f2f2f2;
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
`;
export const SignUpFormLi = styled.li`
  display: flex;
  flex-direction: column;
  flex: 1 1;
  margin: 0;
`;
/////////////////////////////////////////////////////////////
//////////////////////MY POST////////////////////////////////
/////////////////////////////////////////////////////////////

export const MyPostsContainer = styled.section`
  padding-top: 5rem;
`;
export const MyPostsBlock = styled.div`
  margin: 0 auto;
  min-height: 100vh;
  // width는 반응형임
  width: 1200px;
`;
export const MyPostsTitle = styled.main`
  display: flex;
  flex-direction: column;
`;
export const MyPostsTitleCategory = styled.section`
  display: flex;
  margin-bottom: 2rem;
  justify-content: center;
`;
export const MyPostsTitleCategoryItem = styled.div`
  display: flex;
  align-items: center;
  margin-right: 1rem;
  cursor: pointer;
  font-weight: 700;
  font-size: 1.5rem;
  flex-direction: column;
  width: 90%;
`;

/////////////////////////////////////////////////////////////
//////////////////////SETTING////////////////////////////////
/////////////////////////////////////////////////////////////
export const SettingContainer = styled.div`
  padding-left: 1rem;
  padding-right: 1rem;
  margin-top: 3rem;
  margin-left: auto;
  margin-right: auto;
  width: 800px;
  padding-bottom: 5rem;
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

/////////////////////////////////////////////
////////////////SIGN UP//////////////////////
/////////////////////////////////////////////

export const SignUpInput = styled.input`
  width: 80%;
  height: 40px;
  font-size: 20px;
  padding-left: 15px;
  margin-bottom: 10px;
  margin-top: 10px;
  display: flex;
  justify-content: center;
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

/////////////////////////////////////////////
////////////////SIGN IN//////////////////////
/////////////////////////////////////////////

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
  // height: 550px;
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
`;
export const ModalHeader = styled.div`
  background: #f8f9fa;
  padding: 0 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 8px 8px 0 0;
  height: 3rem;
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
  margin-block-start: 0.67em;
  margin-block-end: 0.67em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  font-weight: bold;
`;
export const ModalInnerBox = styled.div`
  margin-top: 4rem;
  width: 60%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
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
  margin-bottom: 30px;
  text-align: center;
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
  margin-bottom: 40px;
`;
/////////////////////////////////////////////
//////////////////STUDY//////////////////////
/////////////////////////////////////////////

export const StudyContainer = styled.div`
  max-width: 900px;
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  padding: 1.5rem 1.5rem 5rem;
`;
export const StudyHeadSection = styled.section`
  display: flex;
  flex-direction: column;
  margin-top: 3rem;
`;
export const StudyHeadTitle = styled.div`
  margin-top: 2.5rem;
  font-weight: 800;
  font-size: 3rem;
  line-height: 126.5%;
  letter-spacing: -0.005em;
  color: #000;
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
export const StudyHeadUserName = styled.div`
  color: #333;
  cursor: pointer;
  font-size: 18px;
  font-weight: 700;
  padding-right: 15px;
  border-right: 2px solid #e1e1e1;
`;
export const StudyHeadRegisterDate = styled.div`
  font-size: 18px;
  color: #717171;
`;
export const StudyInfoGridUl = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, 3fr);
  grid-row-gap: 24px;
  row-gap: 24px;
  margin-top: 60px;
  list-style: none;
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
`;
export const StudyInfoGridContent = styled.span`
  color: #333;
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
`;
///////////////////////////////////////
/////////////MAIN HEAD DROPDOWN////////
///////////////////////////////////////

export const MainHeadDropdownContainer = styled.div`
  position: absolute;
  top: 100%;
  margin-top: 1rem;
  right: 0;
`;
export const MainHeadDropdownUl = styled.ul`
  position: relative;
  z-index: 5;
  width: 12rem;
  background: #fff;
  box-shadow: 0 5px 25px rgb(0 0 0 / 15%);
  list-style: none;
  margin: 0;
  padding: 0;
`;
export const MainHeadDropdownLi = styled.li`
  padding: 0.75rem 1rem;
  line-height: 1.5;
  font-weight: 500;
  cursor: pointer;
  text-align: left;
`;
export const MainHeadDropdownA = styled.a`
  width: 100%;
  text-decoration: none;
  line-height: 1.5;
  font-weight: 500;
`;

////////////////////////////////////////////
///////////////SOCIAL///////////////////////
////////////////////////////////////////////

export const ModalBtnContainer = styled.section`
  margin-top: 4rem;
  display: flex;
  align-items: center;
  width: 60%;
  justify-content: center;
`;
export const ModalBtnBox = styled.div`
  display: flex;
  flex-direction: column;
`;
export const ModalBtnGoogle = styled.button`
  width: 8rem;
  height: 8rem;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
  transition: all 0.125s ease-in 0s;
  color: #fff;
  box-shadow: 0 5px 25px rgb(0 0 0 / 15%);
  border: none;
`;
export const ModalBtnGithub = styled.button`
  width: 8rem;
  height: 8rem;
  border-radius: 10px;
  outline: none;
  transition: all 0.125s ease-in 0s;
  color: #fff;
  background-color: #272e33;
  box-shadow: 0 5px 25px rgb(0 0 0 / 15%);
  border: none;
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
`;
export const ModalBtnText = styled.p`
  margin-top: 10px;
  font-weight: 700;
  font-size: 1rem;
  line-height: 126.5%;
  text-align: center;
  letter-spacing: -0.005em;
  color: #565656;
`;

//////////////////social login button

export const GoogleBtn = styled.div`
  width: 100%;
  height: 45px;
  background-color: #4285f4;
  box-shadow: 0 3px 4px 0 rgba(0, 0, 0, 0.25);
  cursor: pointer;
  margin-bottom: 14px;
  display: flex;
  border-radius: 10px;
`;
export const GoogleIconWrapper = styled.div`
  margin-top: 1px;
  margin-left: 1px;
  width: 42px;
  height: 42px;
  background-color: #fff;
  border-radius: 10px;
`;
export const GoogleIconImg = styled.img`
  position: absolute;
  margin-top: 11px;
  margin-left: 11px;
  width: 24px;
  height: 24px;
`;
export const GoogleBtnText = styled.p`
  color: #fff;
  margin-left: 62px;
  font-size: 16px;
  font-weight: 700;
`;
