import React, { useEffect } from "react";
import {
  MyPostsContainer,
  MyPostsBlock,
  MyPostsTitle,
  MyPostsTitleCategory,
  MyPostsTitleCategoryItem,
} from "../components";
import { BsFillJournalBookmarkFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import authCheck from "../../util/authCheck";
import getMyPost from "../../util/getMyPost";
function MyPosts() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => {
    return state.user;
  });
  useEffect(() => {
    authCheck(dispatch, navigate, user);
  }, []);
  useEffect(() => {
    getMyPost(dispatch, navigate);
  }, []);
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
