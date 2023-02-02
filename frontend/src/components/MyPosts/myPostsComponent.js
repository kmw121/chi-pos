import styled from "styled-components";

export const MyPostsContainer = styled.section`
  padding-top: 5rem;
  @media (max-width: 500px) {
    padding-top: 0px;
  }
`;
export const MyPostsBlock = styled.div`
  margin: 0 auto;
  min-height: 100vh;
  width: 1200px;
  @media (max-width: 500px) {
    width: 90%;
  }
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
export const MyPostsTitleTextDiv = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 50px;
`;
export const MyPostsContentsContainer = styled.div`
  width: 100%;
  height: 130px;
  display: flex;
  margin-bottom: 30px;
  border: 8px solid;
  padding: 1rem;
  border-image: linear-gradient(to left, turquoise, greenyellow) 1 0;
`;
export const MyPostsContentsTopBox = styled.div`
  width: 70%;
  box-sizing: border-box;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
export const MyPostsContentsBottomBox = styled.div`
  width: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
export const MyPostsContentsAppStudyInfoRightDetail = styled.div`
  display: flex;
  align-items: center;
  color: #999;
  grid-gap: 6px;
  gap: 6px;
`;
export const MyPostsEmptyBox = styled.div`
  width: 100%;
  height: 50vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
export const MyPostsNothingText = styled.div`
  font-size: 3rem;
  color: #868e96;
`;
export const MyPostsNothingGoText = styled.div`
  font-size: 2rem;
  color: #ced4da;
  cursor: pointer;
  &:hover {
    color: #868e96;
  }
`;
