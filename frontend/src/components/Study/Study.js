import React from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
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
  return (
    <StudyContainer>
      <StudyHeadSection>
        <AiOutlineArrowLeft onClick={onGoBack} />
        <StudyHeadTitle>
          [서울대입구역, 낙성대역] 모각코 구합니다
        </StudyHeadTitle>
        <StudyHeadUserAndDate>
          <StudyHeadUserBox>
            <AiOutlineArrowLeft />
            <StudyHeadUserName>말하는콩순이</StudyHeadUserName>
            <StudyHeadRegisterDate>2022.12.21</StudyHeadRegisterDate>
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
        <StudyProjectDetail>
          {`혼자 공부하기 어려우셨던 취준생 분들 계신가요?
            같이 감시하면서 공부하는건 어떨까요? 주중 아침에 모여서 오늘 할 일 브리핑하고, 오늘 할
          일 다 끝내야 집에 갈 수 있습니다. 모여서 각자 공부하면 될 것 같습니다.
          관심있으신 분들은 연락주세요.`}
        </StudyProjectDetail>
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
