import React, { useState } from "react";
import {
  AiOutlineArrowLeft,
  AiOutlineCloseCircle,
  AiOutlineLink,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import useGetPostsById from "../../hooks/useGetPostsById";
import { getCookie } from "../../util/cookie";
import {
  StudyContainer,
  StudyHeadSection,
  StudyHeadTitle,
  StudyHeadUserAndDate,
  StudyHeadUserBox,
  StudyHeadUserName,
  StudyInfoGridUl,
  StudyInfoGridLi,
  StudyInfoGridTitle,
  StudyInfoGridContent,
  StudyProjectBox,
  StudyProjectInfo,
  StudyProjectDetail,
  StudyCommentBox,
  StudyCommentInnerBox,
  StudyCommentInputBox,
  StudyCommentInputCount,
  StudyCommentInputText,
  StudyButtonBox,
  StudyButton,
  StudyHeadRegisterDate,
  StudyAuthBtnSection,
  StudyAuthBtn,
  StudyCommentUl,
  StudyCommentLi,
  StudyCommentHead,
  StudyCommentHeadBox,
  StudyCommentHeadImg,
  StudyCommentHeadNameDateBox,
  StudyCommentHeadName,
  StudyCommentHeadDate,
  StudyCommentMain,
  StudyCommentMainText,
  StudyInfoGridA,
  StudyHeadUserBoxImg,
  StudyPendingCOntainer,
  StudyPendingImg,
} from "./studyComponents";
import { setEditingPost } from "../../slice/userSlice";
import postDeadline from "../../util/postDeadline";
import { toast } from "react-toastify";
import postDelete from "../../util/postDelete";
import postComment from "../../util/postComment";
import postDeleteComment from "../../util/postDeleteComment";
import { fulfilled } from "../../constant";

function Study() {
  const dispatch = useDispatch();
  const { id } = useParams();
  useGetPostsById(id, dispatch);
  const navigate = useNavigate();
  const onGoBack = () => {
    navigate(-1);
  };
  const { user, currentPost, loading } = useSelector((state) => {
    return state.user;
  });
  const post = currentPost;
  const [comment, setComment] = useState("");
  const handleCommentValue = (e) => {
    setComment(e.target.value);
  };
  const onDeadline = async () => {
    try {
      await postDeadline(id, getCookie("jwtToken"), dispatch, navigate);
    } catch {
      toast.error("마감에 실패하였습니다.");
    }
  };
  const onPostDelete = async () => {
    try {
      await postDelete(id, getCookie("jwtToken"), dispatch, navigate);
    } catch {
      toast.error("게시글 삭제에 실패하였습니다.");
    }
  };
  const onPostComment = async () => {
    try {
      await postComment(
        post,
        comment,
        getCookie("jwtToken"),
        dispatch,
        navigate,
        id,
        setComment
      );
    } catch {
      toast.error("댓글 작성에 실패하였습니다. 다시 시도해주세요.");
    }
  };
  const onDeleteComment = async (contentId) => {
    try {
      await postDeleteComment(
        contentId,
        getCookie("jwtToken"),
        dispatch,
        navigate,
        id
      );
    } catch {
      toast.error("댓글 삭제에 실패하였습니다. 다시 시도해주세요.");
    }
  };
  const handleEditPost = () => {
    dispatch(setEditingPost(post));
    navigate("/register");
  };
  return (
    <>
      {loading !== fulfilled && (
        <StudyPendingCOntainer>
          <StudyPendingImg src="/c-pos/ms-icon-310x310.png" alt="logo" />
        </StudyPendingCOntainer>
      )}
      <StudyContainer>
        <StudyHeadSection>
          <AiOutlineArrowLeft className="studyLeftBtn" onClick={onGoBack} />
          <StudyHeadTitle>{post && post.title}</StudyHeadTitle>
          <StudyHeadUserAndDate>
            <StudyHeadUserBox>
              <StudyHeadUserBoxImg
                src={
                  post && post.user.imageUrl === "nonUrl"
                    ? "/c-pos/ms-icon-310x310.png"
                    : post && post.user.imageUrl
                }
                alt="pic"
              />
              <StudyHeadUserName>
                {post ? post.user.nickName : null}
              </StudyHeadUserName>
            </StudyHeadUserBox>
            <StudyHeadRegisterDate>
              {post && post.createdDate.slice(0, 10).replace(/-/gi, " . ")}
            </StudyHeadRegisterDate>
          </StudyHeadUserAndDate>
          {post && post.user.id === user.data.id && (
            <StudyAuthBtnSection>
              <StudyAuthBtn onClick={onDeadline}>마감</StudyAuthBtn>
              <StudyAuthBtn onClick={handleEditPost}>수정</StudyAuthBtn>
              <StudyAuthBtn onClick={onPostDelete}>삭제</StudyAuthBtn>
            </StudyAuthBtnSection>
          )}
          <StudyInfoGridUl>
            <StudyInfoGridLi>
              <StudyInfoGridTitle>모집 구분</StudyInfoGridTitle>
              <StudyInfoGridContent>
                {post && post.categoryType}
              </StudyInfoGridContent>
            </StudyInfoGridLi>
            <StudyInfoGridLi>
              <StudyInfoGridTitle>진행 방식</StudyInfoGridTitle>
              <StudyInfoGridContent>{post && post.howto}</StudyInfoGridContent>
            </StudyInfoGridLi>
            <StudyInfoGridLi>
              <StudyInfoGridTitle>모집 인원</StudyInfoGridTitle>
              <StudyInfoGridContent>{post && post.people}</StudyInfoGridContent>
            </StudyInfoGridLi>
            <StudyInfoGridLi>
              <StudyInfoGridTitle>시작 예정</StudyInfoGridTitle>
              <StudyInfoGridContent>
                {post && post.startDate.slice(0, 10).replace(/-/gi, ".")}
              </StudyInfoGridContent>
            </StudyInfoGridLi>
            <StudyInfoGridLi>
              <StudyInfoGridTitle>연락 방법</StudyInfoGridTitle>
              <StudyInfoGridA href={post && `https://${post.contactAddress}`}>
                {post && post.contact}
                <AiOutlineLink className="studyLink" />
              </StudyInfoGridA>
            </StudyInfoGridLi>
            <StudyInfoGridLi>
              <StudyInfoGridTitle>예상 기간</StudyInfoGridTitle>
              <StudyInfoGridContent>
                {post && post.duration}
              </StudyInfoGridContent>
            </StudyInfoGridLi>
            <StudyInfoGridLi>
              <StudyInfoGridTitle>사용 언어</StudyInfoGridTitle>
              <StudyInfoGridContent>
                {post && post.postStack.length !== 0
                  ? post.postStack[0].stack.name
                  : null}
              </StudyInfoGridContent>
            </StudyInfoGridLi>
          </StudyInfoGridUl>
        </StudyHeadSection>
        <StudyProjectBox>
          <StudyProjectInfo>프로젝트 소개</StudyProjectInfo>
          <StudyProjectDetail
            dangerouslySetInnerHTML={{ __html: post && post.detail }}
          />
        </StudyProjectBox>
        <StudyCommentBox>
          <StudyCommentInnerBox>
            <StudyCommentInputBox>
              <StudyCommentInputCount>
                {post && post.comments.length}개의 댓글이 있습니다.
              </StudyCommentInputCount>
              <StudyCommentInputText
                value={comment}
                onChange={handleCommentValue}
                disabled={post && !user.data.id ? true : false}
                placeholder="댓글을 입력하세요."
              ></StudyCommentInputText>
            </StudyCommentInputBox>
          </StudyCommentInnerBox>
          <StudyButtonBox>
            <StudyButton onClick={onPostComment}>댓글 등록</StudyButton>
          </StudyButtonBox>
          <StudyCommentUl>
            {post &&
              post.comments.map((content) => (
                <StudyCommentLi key={content.createdDate + content.id}>
                  <StudyCommentHead>
                    <StudyCommentHeadBox>
                      <StudyCommentHeadImg
                        src={
                          content.user.imageUrl === "nonUrl"
                            ? "/c-pos/ms-icon-310x310.png"
                            : content.user.imageUrl
                        }
                        alt="zz"
                      />
                      <StudyCommentHeadNameDateBox>
                        <StudyCommentHeadName>
                          {content.user.nickName}
                        </StudyCommentHeadName>
                        <StudyCommentHeadDate>
                          {content.createdDate.slice(0, 10).replace(/-/gi, ".")}
                        </StudyCommentHeadDate>
                      </StudyCommentHeadNameDateBox>
                    </StudyCommentHeadBox>
                    {post && user.data.id === content.user.id && (
                      <AiOutlineCloseCircle
                        className="studyCommentDelete"
                        onClick={() => onDeleteComment(content.id)}
                      />
                    )}
                  </StudyCommentHead>
                  <StudyCommentMain>
                    <StudyCommentMainText>
                      {content.detail}
                    </StudyCommentMainText>
                  </StudyCommentMain>
                </StudyCommentLi>
              ))}
          </StudyCommentUl>
        </StudyCommentBox>
      </StudyContainer>
    </>
  );
}

export default Study;
