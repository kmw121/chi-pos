import React, { useEffect } from "react";
import {
  MyPostsContainer,
  MyPostsBlock,
  MyPostsTitle,
  MyPostsTitleCategory,
  MyPostsTitleCategoryItem,
  MainContentsAppStudyInfoRightDetail,
} from "../components";
import { AiOutlineEye, AiOutlineMessage } from "react-icons/ai";
import { BsFillJournalBookmarkFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import authCheck from "../../util/authCheck";
import useGetMyPost from "../../hooks/useGetMyPost";
function MyPosts() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => {
    return state.user;
  });
  const { post } = useGetMyPost(dispatch, navigate);
  const onGoToPost = (id) => {
    navigate("/");
    navigate(`study/${id}`);
  };
  useEffect(() => {
    authCheck(dispatch, navigate, user);
  }, []);
  return (
    <MyPostsContainer>
      <MyPostsBlock>
        <MyPostsTitle>
          <MyPostsTitleCategory>
            <MyPostsTitleCategoryItem>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "50px",
                }}
              >
                <BsFillJournalBookmarkFill />
                <span>작성 목록</span>
              </div>
              {post.map((content, idx) => (
                <div
                  key={content.createdDate + content.id + content.startDate}
                  style={{
                    width: "100%",
                    height: "130px",
                    display: "flex",
                    marginBottom: "30px",
                    border: "8px solid",
                    padding: "1rem",
                    borderImage:
                      "linear-gradient(to left, turquoise, greenyellow) 1 0",
                  }}
                  onClick={() => onGoToPost(content.id)}
                >
                  <div
                    style={{
                      width: "70%",
                      boxSizing: "border-box",
                      padding: "10px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "column",
                    }}
                  >
                    <div style={{ fontSize: "14px" }}>No. {idx + 1}</div>
                    <div style={{}}>
                      {content.title} ({content.howto})
                    </div>
                    <div style={{ fontSize: "15px" }}>
                      #{content.categoryType}&nbsp;#{content.people}&nbsp;#
                      {content.duration}&nbsp;
                      {content.postStack.map((inside) => (
                        <span key={inside.stack.id}>
                          &nbsp;#{inside.stack.name}&nbsp;
                        </span>
                      ))}
                    </div>
                  </div>
                  <div
                    style={{
                      width: "20%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "column",
                    }}
                  >
                    <MainContentsAppStudyInfoRightDetail>
                      <AiOutlineEye style={{ width: "22px", height: "22px" }} />
                      <span style={{ color: "black", fontSize: "22px" }}>
                        {content.view}
                      </span>
                    </MainContentsAppStudyInfoRightDetail>{" "}
                    <MainContentsAppStudyInfoRightDetail>
                      <AiOutlineMessage
                        style={{ width: "22px", height: "22px" }}
                      />
                      <span style={{ color: "black", fontSize: "22px" }}>
                        {content.comments.length}
                      </span>
                    </MainContentsAppStudyInfoRightDetail>
                  </div>
                </div>
              ))}
            </MyPostsTitleCategoryItem>
          </MyPostsTitleCategory>
        </MyPostsTitle>
      </MyPostsBlock>
    </MyPostsContainer>
  );
}

export default MyPosts;
