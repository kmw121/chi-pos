import React from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import useGetPostsById from "../../hooks/useGetPostsById";
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
} from "../components";
function Study() {
  const aa = [
    { a: "모집 구분", b: "스터디" },
    { a: "진행 방식", b: "오프라인" },
    { a: "모집 인원", b: "4명" },
    { a: "시작 예정", b: "2022.12.21" },
    { a: "연락 방법", b: "카카오톡 오픈채팅" },
    { a: "예상 기간", b: "6개월" },
    { a: "사용 언어", b: "React, JAVA" },
  ];
  const navigate = useNavigate();
  const onGoBack = () => {
    navigate(-1);
  };
  const { posts, user } = useSelector((state) => {
    return state.user;
  });
  const { id } = useParams();
  const post = useGetPostsById(id);
  console.log(`id : ${id}`);
  console.log(post);
  return (
    <StudyContainer>
      <StudyHeadSection>
        <AiOutlineArrowLeft onClick={onGoBack} />
        <StudyHeadTitle>{post.title}</StudyHeadTitle>
        <StudyHeadUserAndDate>
          <StudyHeadUserBox>
            <AiOutlineArrowLeft />
            <StudyHeadUserName>{post.user.nickName}</StudyHeadUserName>
            <StudyHeadRegisterDate>
              {post.createDate.slice(0, 10).replace(/-/gi, " . ")}
            </StudyHeadRegisterDate>
          </StudyHeadUserBox>
        </StudyHeadUserAndDate>

        <StudyInfoGridUl>
          {aa.map((content) => (
            <StudyInfoGridLi key={content.a}>
              <StudyInfoGridTitle>{content.a}</StudyInfoGridTitle>
              <StudyInfoGridContent>{content.b}</StudyInfoGridContent>
            </StudyInfoGridLi>
          ))}
        </StudyInfoGridUl>
      </StudyHeadSection>
      <StudyProjectBox>
        <StudyProjectInfo>프로젝트 소개</StudyProjectInfo>
        <StudyProjectDetail>{post.detail}</StudyProjectDetail>
      </StudyProjectBox>

      <StudyCommentBox>
        <StudyCommentInnerBox>
          <StudyCommentInputBox>
            <StudyCommentInputCount>
              0개의 댓글이 있습니다.
            </StudyCommentInputCount>
            <StudyCommentInputText placeholder="댓글을 입력하세요."></StudyCommentInputText>
          </StudyCommentInputBox>
        </StudyCommentInnerBox>
        <StudyButtonBox>
          <StudyButton>댓글 등록</StudyButton>
        </StudyButtonBox>
      </StudyCommentBox>
    </StudyContainer>
  );
}

export default Study;
