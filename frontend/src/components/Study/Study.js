import axios from "axios";
import React, { useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../../API_URL";
import useGetPostsById from "../../hooks/useGetPostsById";
import { getCookie } from "../../cookie";
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
  const navigate = useNavigate();
  const onGoBack = () => {
    navigate("/");
  };
  const { userInfo, user } = useSelector((state) => {
    return state.user;
  });
  const [comment, setComment] = useState("");
  const handleComment = (e) => setComment(e.target.value);
  console.log("댓글 : ", comment);
  const { id } = useParams();
  const post = useGetPostsById(id);
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
        console.log("마감 데이터 : ", res);
      } catch (err) {
        console.log(err);
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
        } else if (res.data.code === -1) {
          alert("알 수 없는 오류가 발생하였습니다.");
          logout();
        }
        console.log("마감 데이터 : ", res);
      } catch (err) {
        console.log(err);
      }
    }
  };
  const onPostComment = async () => {
    try {
      const res = await axios.post(API_URL + "/post/comment", comment, {
        headers: {
          Authorization: `${getCookie("jwtToken")}`,
        },
      });
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };
  console.log(`id : ${id}`);
  // console.log("post.user.id : ", post.user.id);
  // console.log("user.id : ", user.id);
  // console.log("post : ", post);
  // console.log(userInfo.data === null);
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
            {post.createDate.slice(0, 10).replace(/-/gi, " . ")}
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
            <StudyInfoGridContent>{post.category}</StudyInfoGridContent>
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
              onChange={handleComment}
              disabled={user.id === undefined ? true : false}
              placeholder="댓글을 입력하세요."
            ></StudyCommentInputText>
          </StudyCommentInputBox>
        </StudyCommentInnerBox>
        <StudyButtonBox>
          <StudyButton onClick={onPostComment}>댓글 등록</StudyButton>
        </StudyButtonBox>
        <StudyCommentUl>
          {/* 요밑에 Li부터 MAP으로 뿌리시오!  */}
          <StudyCommentLi>
            <StudyCommentHead>
              <StudyCommentHeadBox>
                <StudyCommentHeadImg src={"/logo/Git.png"} alt="zz" />
                <StudyCommentHeadNameDateBox>
                  <StudyCommentHeadName>NICKNAME</StudyCommentHeadName>
                  <StudyCommentHeadDate>작성시간...</StudyCommentHeadDate>
                </StudyCommentHeadNameDateBox>
              </StudyCommentHeadBox>
            </StudyCommentHead>
            <StudyCommentMain>
              <StudyCommentMainText>댓글 들어갈 자리</StudyCommentMainText>
            </StudyCommentMain>
          </StudyCommentLi>
        </StudyCommentUl>
      </StudyCommentBox>
    </StudyContainer>
  );
}

export default Study;
