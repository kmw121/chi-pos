import React from "react";
import {
  MyPostsContainer,
  MyPostsBlock,
  MyPostsTitle,
  MyPostsTitleCategory,
  MyPostsTitleCategoryItem,
} from "../components";
import { BsFillJournalBookmarkFill } from "react-icons/bs";
function MyPosts() {
  return (
    <MyPostsContainer>
      <MyPostsBlock>
        <MyPostsTitle>
          <MyPostsTitleCategory>
            <MyPostsTitleCategoryItem>
              <BsFillJournalBookmarkFill />
              <span>작성 목록</span>
            </MyPostsTitleCategoryItem>
          </MyPostsTitleCategory>
        </MyPostsTitle>
      </MyPostsBlock>
    </MyPostsContainer>
  );
}

export default MyPosts;
