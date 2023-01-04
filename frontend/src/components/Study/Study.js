import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { AiOutlineArrowLeft, AiOutlineCloseCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../../util/API_URL";
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
} from "../components";
import { logout } from "../../util/logout";
function Study() {
  const dispatch = useDispatch();
  const { id } = useParams();
  useGetPostsById(id, dispatch);
  const navigate = useNavigate();
  const onGoBack = () => {
    navigate("/");
  };
  const { user, currentPost } = useSelector((state) => {
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
        const res = await axios.post(API_URL + `/end/${id}`, {
          headers: {
            Authorization: `${getCookie("jwtToken")}`,
          },
        });
        if (res.data.code === 1) {
          alert("마감되었습니다.");
          navigate("/");
        } else if (res.data.code === -1) {
          alert("알 수 없는 오류가 발생하였습니다.");
          logout();
        }
      } catch (err) {
        throw new Error(err);
      }
    }
  };
  const onPostDelete = async () => {
    if (window.confirm("삭제하시겠습니까?")) {
      try {
        const res = await axios.delete(API_URL + `/post/${id}`, {
          headers: {
            Authorization: `${getCookie("jwtToken")}`,
          },
        });
        if (res.data.code === 1) {
          alert("삭제되었습니다.");
          navigate("/");
        } else if (res.data.code === 2) {
          const nextRes = await axios.delete(API_URL + `/post/${id}`, {
            headers: {
              Authorization: `${getCookie("refreshToken")}`,
            },
          });
          if (nextRes.data.code === 1) {
            alert("삭제되었습니다.");
            navigate("/");
          } else if (nextRes.data.code === -1 || nextRes.data.code === 2) {
            deleteCookie(["jwtToken"]);
            deleteCookie(["refreshToken"]);
            alert("잘못된 접근입니다. 다시 로그인해주세요.");
            navigate("/");
          }
        } else if (res.data.code === -1) {
          alert("알 수 없는 오류가 발생하였습니다.");
          logout();
        }
      } catch (err) {
        throw new Error(err);
      }
    }
  };
  const onPostComment = async () => {
    if (window.confirm("댓글을 등록하시겠습니까?")) {
      try {
        const res = await axios.post(
          API_URL + "/comment",
          { postId: post.id, detail: comment },
          {
            headers: {
              Authorization: `${getCookie("jwtToken")}`,
            },
          }
        );
        if (res.data.code === 1) {
          alert("댓글이 등록되었습니다!");
          setComment("");
          window.location.reload();
        } else if (res.data.code === 2) {
          const nextRes = await axios.post(
            API_URL + "/comment",
            { postId: post.id, detail: comment },
            { headers: { Authorization: `${getCookie("refreshToken")}` } }
          );
          if (nextRes.data.code === 1) {
            alert("댓글이 등록되었습니다!");
            setComment("");
            window.location.reload();
          } else if (nextRes.data.code === 2 || nextRes.data.code === -1) {
            deleteCookie(["jwtToken"]);
            deleteCookie(["refreshToken"]);
            alert("잘못된 접근입니다. 다시 로그인해주세요.");
            navigate("/");
          }
        } else if (res.data.code === -1) {
          alert("로그인 후 시도해주세요.");
        }
      } catch (err) {
        throw new Error(err);
      }
    }
  };
  const onDeleteComment = async (id) => {
    if (window.confirm("댓글을 삭제하시겠습니까?")) {
      try {
        const res = await axios.delete(API_URL + `/comment/${id}`, {
          headers: {
            Authorization: `${getCookie("jwtToken")}`,
          },
        });
        if (res.data.code === 1) {
          alert("댓글이 삭제되었습니다.");
          window.location.reload();
        } else if (res.data.code === 2) {
          const nextRes = await axios.delete(API_URL + `/comment/${id}`, {
            headers: { Authorization: `${getCookie("refreshToken")}` },
          });
          if (nextRes.data.code === 2 || nextRes.data.code === -1) {
            deleteCookie(["jwtToken"]);
            deleteCookie(["refreshToken"]);
            alert("잘못된 접근입니다. 다시 로그인해주세요.");
            navigate("/");
          } else if (nextRes.data.code === 1) {
            deleteCookie("jwtToken");
            setCookie("jwtToken", nextRes.data.data);
            alert("댓글이 삭제되었습니다.");
            window.location.reload();
          }
        }
      } catch (err) {
        throw new Error(err);
      }
    }
  };
  return (
    <StudyContainer>
      <StudyHeadSection>
        <AiOutlineArrowLeft
          style={{ width: "25px", height: "25px", cursor: "pointer" }}
          onClick={onGoBack}
        />
        <StudyHeadTitle>{post.title}</StudyHeadTitle>
        <StudyHeadUserAndDate>
          <StudyHeadUserBox>
            <img
              src={"/logo/NextJs.png"}
              alt="pic"
              style={{
                width: "3rem",
                height: "3rem",
                display: "block",
                marginRight: "16px",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
            <StudyHeadUserName>{post.user.nickName}</StudyHeadUserName>
          </StudyHeadUserBox>
          <StudyHeadRegisterDate>
            {post.createdDate.slice(0, 10).replace(/-/gi, " . ")}
          </StudyHeadRegisterDate>
        </StudyHeadUserAndDate>
        {post.user.id === user.id && (
          <StudyAuthBtnSection>
            <StudyAuthBtn onClick={onDeadline}>마감</StudyAuthBtn>
            <StudyAuthBtn>수정</StudyAuthBtn>
            <StudyAuthBtn onClick={onPostDelete}>삭제</StudyAuthBtn>
          </StudyAuthBtnSection>
        )}
        <StudyInfoGridUl>
          <StudyInfoGridLi>
            <StudyInfoGridTitle>모집 구분</StudyInfoGridTitle>
            <StudyInfoGridContent>{post.categoryType}</StudyInfoGridContent>
          </StudyInfoGridLi>
          <StudyInfoGridLi>
            <StudyInfoGridTitle>진행 방식</StudyInfoGridTitle>
            <StudyInfoGridContent>{post.howto}</StudyInfoGridContent>
          </StudyInfoGridLi>
          <StudyInfoGridLi>
            <StudyInfoGridTitle>모집 인원</StudyInfoGridTitle>
            <StudyInfoGridContent>{post.people}</StudyInfoGridContent>
          </StudyInfoGridLi>
          <StudyInfoGridLi>
            <StudyInfoGridTitle>시작 예정</StudyInfoGridTitle>
            <StudyInfoGridContent>
              {post.startDate.slice(0, 10).replace(/-/gi, ".")}
            </StudyInfoGridContent>
          </StudyInfoGridLi>
          <StudyInfoGridLi>
            <StudyInfoGridTitle>연락 방법</StudyInfoGridTitle>
            <StudyInfoGridContent>{post.contact}</StudyInfoGridContent>
          </StudyInfoGridLi>
          <StudyInfoGridLi>
            <StudyInfoGridTitle>예상 기간</StudyInfoGridTitle>
            <StudyInfoGridContent>{post.duration}</StudyInfoGridContent>
          </StudyInfoGridLi>
          <StudyInfoGridLi>
            <StudyInfoGridTitle>사용 언어</StudyInfoGridTitle>
            <StudyInfoGridContent>
              {post.postStack.length !== 0
                ? post.postStack[0].stack.name
                : null}
            </StudyInfoGridContent>
          </StudyInfoGridLi>
        </StudyInfoGridUl>
      </StudyHeadSection>
      <StudyProjectBox>
        <StudyProjectInfo>프로젝트 소개</StudyProjectInfo>
        <StudyProjectDetail dangerouslySetInnerHTML={{ __html: post.detail }} />
      </StudyProjectBox>
      <StudyCommentBox>
        <StudyCommentInnerBox>
          <StudyCommentInputBox>
            <StudyCommentInputCount>
              0개의 댓글이 있습니다.
            </StudyCommentInputCount>
            <StudyCommentInputText
              value={comment}
              onChange={handleCommentValue}
              disabled={user.id === undefined ? true : false}
              placeholder="댓글을 입력하세요."
            ></StudyCommentInputText>
          </StudyCommentInputBox>
        </StudyCommentInnerBox>
        <StudyButtonBox>
          <StudyButton onClick={onPostComment}>댓글 등록</StudyButton>
        </StudyButtonBox>
        <StudyCommentUl>
          {post.comments.map((content) => (
            <StudyCommentLi key={content.createdDate + content.id}>
              <StudyCommentHead>
                <StudyCommentHeadBox>
                  <StudyCommentHeadImg src={"/logo/Git.png"} alt="zz" />
                  <StudyCommentHeadNameDateBox>
                    <StudyCommentHeadName>
                      {content.user.nickName}
                    </StudyCommentHeadName>
                    <StudyCommentHeadDate>
                      {content.createdDate.slice(0, 10).replace(/-/gi, ".")}
                    </StudyCommentHeadDate>
                  </StudyCommentHeadNameDateBox>
                </StudyCommentHeadBox>
                {user.id === content.user.id && (
                  <AiOutlineCloseCircle
                    style={{
                      display: "flex",
                      alignItems: "center",
                      cursor: "pointer",
                      width: "28px",
                      height: "28px",
                      justifyContent: "center",
                    }}
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
