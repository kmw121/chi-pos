import React, { useEffect, useState } from "react";
import {
  AiOutlineArrowLeft,
  AiOutlineCloseCircle,
  AiOutlineLink,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import useGetPostsById from "../../hooks/useGetPostsById";
import { getCookie, setCookie } from "../../util/cookie";
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
} from "./studyComponents";
import { logout } from "../../util/logout";
import { setCurrentPost, setEditingPost } from "../../slice/userSlice";
import postDeadline from "../../util/postDeadline";
import { toast } from "react-toastify";
import postDelete from "../../util/postDelete";
import postComment from "../../util/postComment";
import postDeleteComment from "../../util/postDeleteComment";
import wrongRequest from "../../util/wrongRequest";
import getCurrentPost from "../../util/getCurrentPost";
import {
  accessTokenValidate,
  newAccessTokenValidate,
  refreshTokenValidate,
} from "../../util/tokenValidation";

function Study() {
  const dispatch = useDispatch();
  const { id } = useParams();
  useGetPostsById(id, dispatch);
  const navigate = useNavigate();
  const onGoBack = () => {
    navigate(-1);
  };
  const { user, currentPost } = useSelector((state) => {
    return state.user;
  });
  const post = currentPost;
  const [comment, setComment] = useState("");
  const handleCommentValue = (e) => {
    setComment(e.target.value);
  };
  const onDeadline = async () => {
    try {
      await postDeadline(id, getCookie, dispatch, navigate);
    } catch (err) {
      toast.error(err);
    }
  };
  const onPostDelete = async () => {
    try {
      const deleteRes = await postDelete(id, getCookie("jwtToken"));
      const { accessValid, accessExpired, accessInvalid } = accessTokenValidate(
        deleteRes
      );
      if (accessValid) {
        toast.success("삭제되었습니다.");
        navigate("/");
        dispatch(setCurrentPost(await getCurrentPost(id)));
        return;
      }
      if (accessExpired) {
        const nextDeleteRes = await postDelete(id, getCookie("refreshToken"));
        const {
          refreshValid,
          refreshExpired,
          refreshInvalid,
        } = refreshTokenValidate(nextDeleteRes);
        if (refreshValid) {
          setCookie("jwtToken", nextDeleteRes.data.data);
          const response = await postDelete(id, nextDeleteRes.data.data);
          const {
            newAccessValid,
            newAccessExpired,
            newAccessInvalid,
          } = newAccessTokenValidate(response);
          if (newAccessValid) {
            toast.success("삭제되었습니다.");
            navigate("/");
            dispatch(setCurrentPost(await getCurrentPost(id)));
            return;
          }
          if (newAccessExpired || newAccessInvalid) {
            wrongRequest(dispatch, navigate);
            toast.error("잘못된 접근입니다. 다시 로그인해주세요.");
            navigate("/");
            return;
          }
        }
        if (refreshExpired || refreshInvalid) {
          wrongRequest(dispatch, navigate);
          toast.error("잘못된 접근입니다. 다시 로그인해주세요.");
          navigate("/");
          return;
        }
      }
      if (accessInvalid) {
        toast.error("잘못된 접근입니다. 다시 로그인해주세요.");
        logout();
        return;
      }
    } catch (err) {
      toast.error(err);
    }
  };
  const onPostComment = async () => {
    try {
      const commentRes = await postComment(
        post,
        comment,
        getCookie("jwtToken")
      );
      const { accessValid, accessExpired, accessInvalid } = accessTokenValidate(
        commentRes
      );
      if (accessValid) {
        toast.success("댓글이 등록되었습니다!");
        setComment("");
        dispatch(setCurrentPost(await getCurrentPost(id)));
        return;
      }
      if (accessExpired) {
        const commentNextRes = await postComment(
          post,
          comment,
          getCookie("refreshToken")
        );
        const {
          refreshValid,
          refreshExpired,
          refreshInvalid,
        } = refreshTokenValidate(commentNextRes);
        if (refreshValid) {
          setCookie("jwtToken", commentNextRes.data.data);
          const response = await postComment(
            post,
            comment,
            commentNextRes.data.data
          );
          const { newAccessValid } = newAccessTokenValidate(response);
          if (newAccessValid) {
            toast.success("댓글이 등록되었습니다!");
            setComment("");
            dispatch(setCurrentPost(await getCurrentPost(id)));
            return;
          }
        }
        if (refreshExpired || refreshInvalid) {
          wrongRequest(dispatch, navigate);
          toast.error("잘못된 접근입니다. 다시 로그인해주세요.");
          return;
        }
      }
      if (accessInvalid) {
        toast.error("로그인 후 시도해주세요.");
        return;
      }
    } catch (err) {
      throw new Error(err);
    }
  };
  const onDeleteComment = async (contentId) => {
    try {
      const deleteCommentRes = await postDeleteComment(
        contentId,
        getCookie("jwtToken")
      );
      const { accessValid, accessExpired, accessInvalid } = accessTokenValidate(
        deleteCommentRes
      );
      if (accessValid) {
        toast.success("댓글이 삭제되었습니다.");
        dispatch(setCurrentPost(await getCurrentPost(id)));
        return;
      }
      if (accessExpired) {
        const deleteCommentNextRes = await postDeleteComment(
          contentId,
          getCookie("refreshToken")
        );
        const {
          refreshValid,
          refreshExpired,
          refreshInvalid,
        } = refreshTokenValidate(deleteCommentNextRes);
        if (refreshValid) {
          setCookie("jwtToken", deleteCommentNextRes.data.data);
          toast.error("댓글이 삭제되었습니다.");
          dispatch(setCurrentPost(await getCurrentPost(id)));
          return;
        }
        if (refreshExpired || refreshInvalid) {
          wrongRequest(dispatch, navigate);
          toast.error("잘못된 접근입니다. 다시 로그인해주세요.");
          return;
        }
      }
      if (accessInvalid) {
        wrongRequest(dispatch, navigate);
        toast.error("잘못된 접근입니다. 다시 로그인해주세요.");
        return;
      }
    } catch (err) {
      throw new Error(err);
    }
  };
  const handleEditPost = () => {
    dispatch(setEditingPost(post));
    navigate("/register");
  };
  return (
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
            <StudyInfoGridContent>{post && post.duration}</StudyInfoGridContent>
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
                  {user.length && post && user.data.id === content.user.id && (
                    <AiOutlineCloseCircle
                      className="studyCommentDelete"
                      onClick={() => onDeleteComment(content.id)}
                    />
                  )}
                </StudyCommentHead>
                <StudyCommentMain>
                  <StudyCommentMainText>{content.detail}</StudyCommentMainText>
                </StudyCommentMain>
              </StudyCommentLi>
            ))}
        </StudyCommentUl>
      </StudyCommentBox>
    </StudyContainer>
  );
}

export default Study;
