import styled from "styled-components";
export const Banner = styled.img`
  width: 100vw;
  height: 400px;
  background: thistle;
  cursor: pointer;
  background-size: cover;
  @media (max-width: 500px) {
    height: 180px;
  }
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
  @media (max-width:500px) {
    margin-right: 10px;
    font-size: 16px;
  }
`;
export const MainContentsToggle = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  right: 0;
  @media (max-width: 500px) {
    display: none;
  }
`;
export const MainContentsToggleText = styled.span`
  color: #444;
  font-size: 24px;
  font-weight: 700;
  letter-spacing: -0.03em;
  margin-right: 20px;
  // @media (max-width: 500px) {
  //   font-size: 12px;
  // }
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
  text-decoration: none !important;
  color: inherit;
  transition: 0.2s ease-in;
  &:hover {
    transform: scale(1.04);
  }
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
export const MainContentsAppStudyStackImg = styled.img`
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
export const MainContentsAppStudyInfoUserImg = styled.img`
  width: 28px;
  height: 28px;
  border-radius: 30px;
  margin-right: 10px;
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
export const MainLoadingBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const MainHeadNav = styled.nav`
  margin: auto;
  max-width: 1180px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 85px;
  padding: 0 10px;

  @media (max-width: 500px) {
    height: 50px;
    padding: 0 3px;
  }
`;
export const MainHeadNavLeftImg = styled.img`
  width: 5rem;
  height: 5rem;
  display: block;
  margin-right: 16px;
  border-radius: 50%;
  object-fit: cover;
  @media (max-width: 500px) {
    width: 2.7rem;
    height: 2.7rem;
    margin-right: 10px;
  }
`;
export const MainHeadNavRight = styled.div`
  display: flex;
  gap: 30px;
  align-items: center;
  position: relative;
  @media (max-width: 500px) {
    gap: 12px;
  }
`;
export const MainHeadRightImg = styled.img`
  width: 45px;
  height: 45px;
  border-radius: 10px;
`;
export const MainHeadNavBtn = styled.button`
  cursor: pointer;
  font-weight: 600;
  font-size: 1.125rem;
  outline: none;
  border: none;
  background-color: #fff;
  @media (max-width: 500px) {
    font-size: 0.78rem;
  }
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
  @media (max-width: 500px) {
    gap: 30px;
    padding-left: 10px;
    margin-bottom: 15px;
  }
`;
export const CategoryLi = styled.li`
  display: flex;
  font-weight: 700;
  font-size: 26px;
  line-height: 126.5%;
  color: #848484
  cursor: pointer;
  position: relative;
  transition: 0.1s ease-in;
  &:hover {
    transform: scale(1.04);
  }
  ${(props) =>
    props.isSelected &&
    `
      background-color: white;
      color: black;
    `}
  @media(max-width:500px){
    font-size:0.7rem;
  }    
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
  @media (max-width: 500px) {
    padding: 5px;
    margin-bottom: 20px;
    gap: 10px;
    width: 90%;
  }
`;
export const StackImgStyle = styled.img`
  width: 30px;
  height: 30px;
  @media (max-width: 500px) {
    width: 15px;
    height: 15px;
  }
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
  &:hover {
    transform: scale(1.04);
  }
  @media (max-width: 500px) {
    height: 10px;
  }
`;
export const StackBtnSpan = styled.span`
  font-size: 11px;
`;
export const SelectedStackContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  grid-gap: 30px;
  gap: 30px;
  @media (max-width: 500px) {
    gap: 0px;
  }
`;
export const SelectedStackUl = styled.ul`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  grid-gap: 30px;
  gap: 30px;
  @media (max-width: 500px) {
    margin-right: 10px;
    margin-left: 0px;
    padding: 0;
  }
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
  @media (max-width: 500px) {
    font-size: 11px;
    height: 17px;
    padding: 3px 8px;
  }
`;
export const SelectedStackImgStyle = styled.img`
  width: 25px;
  height: 25px;
  @media (max-width: 500px) {
    width: 18px;
    height: 18px;
  }
`;
export const SelectedFilterClear = styled.span`
  font-size: 24px;
  color: #333;
  cursor: pointer;
  @media (max-width: 500px) {
    font-size: 12px;
  }
`;
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
