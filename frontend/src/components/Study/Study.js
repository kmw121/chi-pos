import React, { useState } from "react";
import {
  AiOutlineArrowLeft,
  AiOutlineCloseCircle,
  AiOutlineLink,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import useGetPostsById from "../../hooks/useGetPostsById";
import { getCookie, deleteCookie, setCookie } from "../../util/cookie";
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
} from "../components";
import { logout } from "../../util/logout";
import { setCurrentPost } from "../../slice/userSlice";
import postDeadline from "../../util/postDeadline";
import { toast, ToastContainer } from "react-toastify";
import postDelete from "../../util/postDelete";
import postComment from "../../util/postComment";
import postDeleteComment from "../../util/postDeleteComment";
import wrongRequest from "../../util/wrongRequest";

function Study() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { currentPost } = useGetPostsById(id, dispatch);
  const navigate = useNavigate();
  const onGoBack = () => {
    navigate(-1);
  };
  const { user } = useSelector((state) => {
    return state.user;
  });
  const post = currentPost[0];
  const [comment, setComment] = useState("");
  const handleCommentValue = (e) => {
    setComment(e.target.value);
  };
  const onDeadline = async () => {
    if (window.confirm("마감하시겠습니까?")) {
      try {
        const deadlineRes = await postDeadline(id, getCookie);
        if (deadlineRes.data.code === 1) {
          toast.success("마감되었습니다.");
          navigate("/");
        } else if (deadlineRes.data.code === -1) {
          toast.error("알 수 없는 오류가 발생하였습니다.");
        }
      } catch (err) {
        throw new Error(err);
      }
    }
  };
  const onPostDelete = async () => {
    if (window.confirm("삭제하시겠습니까?")) {
      try {
        const deleteRes = await postDelete(id, getCookie("jwtToken"));
        if (deleteRes.data.code === 1) {
          toast.success("삭제되었습니다.");
          navigate("/");
        } else if (deleteRes.data.code === 2) {
          const nextDeleteRes = await postDelete(id, getCookie("refreshToken"));
          if (nextDeleteRes.data.code === 1) {
            toast.success("삭제되었습니다.");
            navigate("/");
          } else if (
            nextDeleteRes.data.code === -1 ||
            nextDeleteRes.data.code === 2
          ) {
            wrongRequest(dispatch, navigate);
            toast.error("잘못된 접근입니다. 다시 로그인해주세요.");
            navigate("/");
          }
        } else if (deleteRes.data.code === -1) {
          toast.error("잘못된 접근입니다. 다시 로그인해주세요.");
          logout();
        }
      } catch (err) {
        throw new Error(err);
      }
    }
  };
  console.log(currentPost);
  const onPostComment = async () => {
    if (window.confirm("댓글을 등록하시겠습니까?")) {
      try {
        const commentRes = await postComment(
          post,
          comment,
          getCookie("jwtToken")
        );
        toast.success("zzzzzzzzzz");
        console.log("commentRes : ", commentRes);
        if (commentRes.data.code === 1) {
          toast.success("댓글이 등록되었습니다!");
          setComment("");
          window.location.reload();
        } else if (commentRes.data.code === 2) {
          const commentNextRes = await postComment(
            post,
            comment,
            getCookie("refreshToken")
          );
          if (commentNextRes.data.code === 1) {
            setCookie("jwtToken", commentNextRes.data.data);
            const response = await postComment(
              post,
              comment,
              commentNextRes.data.data
            );
            if (response.data.code === 1) {
              toast.success("댓글이 등록되었습니다!");
              setComment("");
              window.location.reload();
            }
          } else if (
            commentNextRes.data.code === 2 ||
            commentNextRes.data.code === -1
          ) {
            wrongRequest(dispatch, navigate);
            toast.error("잘못된 접근입니다. 다시 로그인해주세요.");
          }
        } else if (commentRes.data.code === -1) {
          toast.error("로그인 후 시도해주세요.");
        }
      } catch (err) {
        throw new Error(err);
      }
    }
  };
  const onDeleteComment = async (id) => {
    if (window.confirm("댓글을 삭제하시겠습니까?")) {
      try {
        const deleteCommentRes = await postDeleteComment(
          id,
          getCookie("jwtToken")
        );
        if (deleteCommentRes.data.code === 1) {
          toast.success("댓글이 삭제되었습니다.");
          window.location.reload();
        } else if (deleteCommentRes.data.code === 2) {
          const deleteCommentNextRes = await postDeleteComment(
            id,
            getCookie("refreshToken")
          );
          if (
            deleteCommentNextRes.data.code === 2 ||
            deleteCommentNextRes.data.code === -1
          ) {
            wrongRequest(dispatch, navigate);
            toast.error("잘못된 접근입니다. 다시 로그인해주세요.");
          } else if (deleteCommentNextRes.data.code === 1) {
            setCookie("jwtToken", deleteCommentNextRes.data.data);
            toast.error("댓글이 삭제되었습니다.");
            window.location.reload();
          }
        }
      } catch (err) {
        throw new Error(err);
      }
    }
  };
  const handleEditPost = () => {
    dispatch(setCurrentPost(post));
    navigate("/register");
  };
  return (
    <>
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
                {post && post.user.nickName}
              </StudyHeadUserName>
            </StudyHeadUserBox>
            <StudyHeadRegisterDate>
              {post && post.createdDate.slice(0, 10).replace(/-/gi, " . ")}
            </StudyHeadRegisterDate>
          </StudyHeadUserAndDate>
          {post && post.user.id === user.id && (
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
                disabled={post && user.id === undefined ? true : false}
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
                    {post && user.id === content.user.id && (
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
      <ToastContainer />
    </>
  );
}

export default Study;
