import React, { useEffect } from "react";
import {
  MyPostsContainer,
  MyPostsBlock,
  MyPostsTitle,
  MyPostsTitleCategory,
  MyPostsTitleCategoryItem,
  MyPostsContentsAppStudyInfoRightDetail,
  MyPostsTitleTextDiv,
  MyPostsContentsContainer,
  MyPostsContentsTopBox,
  MyPostsContentsBottomBox,
  MyPostsEmptyBox,
  MyPostsNothingText,
  MyPostsNothingGoText,
} from "./myPostsComponent";
import { AiOutlineEye, AiOutlineMessage } from "react-icons/ai";
import { BsFillJournalBookmarkFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import authCheck from "../../util/authCheck";
import useGetMyPost from "../../hooks/useGetMyPost";
import { ImFilesEmpty } from "react-icons/im";

function MyPosts() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => {
    return state.user;
  });
  const { post } = useGetMyPost(dispatch, navigate);
  const onGoToPost = (id) => {
    navigate(`study/${id}`);
  };
  const handleToGoRegister = () => {
    navigate("/register");
  };
  useEffect(() => {
    authCheck(dispatch, navigate, user);
  }, []);
  return (
    <MyPostsContainer>
      {!post.length ? (
        <MyPostsEmptyBox>
          <ImFilesEmpty className="myPostsNothingIcon" />
          <MyPostsNothingText>작성한 게시글이 없습니다.</MyPostsNothingText>
          <MyPostsNothingGoText onClick={handleToGoRegister}>
            게시글 작성하러 가기
          </MyPostsNothingGoText>
        </MyPostsEmptyBox>
      ) : (
        <MyPostsBlock>
          <MyPostsTitle>
            <MyPostsTitleCategory>
              <MyPostsTitleCategoryItem>
                <MyPostsTitleTextDiv>
                  <BsFillJournalBookmarkFill className="myPostBookIcon" />
                  <span className="myPostMyPost">작성 목록</span>
                </MyPostsTitleTextDiv>
                {post.map((content, idx) => (
                  <MyPostsContentsContainer
                    key={content.createdDate + content.id + content.startDate}
                    onClick={() => onGoToPost(content.id)}
                  >
                    <MyPostsContentsTopBox>
                      <div className="myPostContentsNumber">No. {idx + 1}</div>
                      <div className="myPostContentsTitle">
                        {content.title} ({content.howto})
                      </div>
                      <div className="myPostContentsText">
                        #{content.categoryType}&nbsp;#{content.people}&nbsp;#
                        {content.duration}&nbsp;
                        {content.postStack.map((inside) => (
                          <span key={inside.stack.id}>
                            &nbsp;#{inside.stack.name}&nbsp;
                          </span>
                        ))}
                      </div>
                    </MyPostsContentsTopBox>
                    <MyPostsContentsBottomBox>
                      <MyPostsContentsAppStudyInfoRightDetail>
                        <AiOutlineEye className="myPostIcon" />
                        <span className="myPostSpan">{content.view}</span>
                      </MyPostsContentsAppStudyInfoRightDetail>
                      <MyPostsContentsAppStudyInfoRightDetail>
                        <AiOutlineMessage className="myPostIcon" />
                        <span className="myPostSpan">
                          {content.comments.length}
                        </span>
                      </MyPostsContentsAppStudyInfoRightDetail>
                    </MyPostsContentsBottomBox>
                  </MyPostsContentsContainer>
                ))}
              </MyPostsTitleCategoryItem>
            </MyPostsTitleCategory>
          </MyPostsTitle>
        </MyPostsBlock>
      )}
    </MyPostsContainer>
  );
}

export default MyPosts;
