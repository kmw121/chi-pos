import React, { useState } from "react";
import Select from "react-select";
import Calendar from "react-calendar";
import { AiOutlineCalendar } from "react-icons/ai";
import "react-calendar/dist/Calendar.css";
import {
  RegisterNumber1ContactInput,
  RegisterNumber1Ul,
  RegisterNumber1Li,
  RegisterNumber1TitleCircle,
  RegisterNumber1Title,
  RegisterNumber1TitleText,
  RegisterNumber1Label,
} from "../components";
function RegisterNumber1() {
  const optionCategory = [
    { value: "스터디", label: "스터디" },
    { value: "프로젝트", label: "프로젝트" },
  ];
  const optionPeople = [
    { value: "인원 미정", label: "인원 미정" },
    { value: "1명", label: "1명" },
    { value: "2명", label: "2명" },
    { value: "3명", label: "3명" },
    { value: "4명", label: "4명" },
    { value: "5명", label: "5명" },
    { value: "6명", label: "6명" },
    { value: "7명", label: "7명" },
    { value: "8명", label: "8명" },
    { value: "9명", label: "9명" },
    { value: "10명", label: "10명" },
  ];
  const optionHowTo = [
    { value: "온라인", label: "온라인" },
    { value: "오프라인", label: "오프라인" },
  ];
  const optionDuration = [
    { value: "기간 미정", label: "기간 미정" },
    { value: "1개월", label: "1개월" },
    { value: "2개월", label: "2개월" },
    { value: "3개월", label: "3개월" },
    { value: "4개월", label: "4개월" },
    { value: "5개월", label: "5개월" },
    { value: "6개월", label: "6개월" },
    { value: "장기", label: "장기" },
  ];
  const optionStack = [
    { value: "스터디", label: "스터디" },
    { value: "프로젝트", label: "프로젝트" },
  ];
  const optionStartDate = [
    { value: "스터디", label: "스터디" },
    { value: "프로젝트", label: "프로젝트" },
  ];
  const optionContact = [
    { value: "카카오톡 오픈채팅", label: "카카오톡 오픈채팅" },
    { value: "이메일", label: "이메일" },
    { value: "구글폼", label: "구글폼" },
  ];
  const [calendarOpen, setCalendarOpen] = useState(false);
  const onClickCalendar = () => {
    setCalendarOpen(!calendarOpen);
  };
  const today = new Date();
  const year = today.getFullYear();
  const month = ("0" + (today.getMonth() + 1)).slice(-2);
  const day = ("0" + today.getDate()).slice(-2);
  const dateString = year + "년 " + month + "월 " + day + "일";
  return (
    <section>
      <RegisterNumber1Title>
        <RegisterNumber1TitleCircle>1</RegisterNumber1TitleCircle>
        <RegisterNumber1TitleText>
          프로젝트 기본 정보를 입력해주세요.
        </RegisterNumber1TitleText>
      </RegisterNumber1Title>
      <RegisterNumber1Ul>
        <RegisterNumber1Li>
          <RegisterNumber1Label>모집 구분</RegisterNumber1Label>
          <Select placeholder="스터디/프로젝트" options={optionCategory} />
        </RegisterNumber1Li>
        <RegisterNumber1Li>
          <RegisterNumber1Label>모집 인원</RegisterNumber1Label>
          <Select placeholder="인원 미정~10명 이상" options={optionPeople} />
        </RegisterNumber1Li>
      </RegisterNumber1Ul>
      <RegisterNumber1Ul>
        <RegisterNumber1Li>
          <RegisterNumber1Label>진행 방식</RegisterNumber1Label>
          <Select placeholder="온라인/오프라인" options={optionHowTo} />
        </RegisterNumber1Li>
        <RegisterNumber1Li>
          <RegisterNumber1Label>진행 기간</RegisterNumber1Label>
          <Select placeholder="기간 미정~6개월 이상" options={optionDuration} />
        </RegisterNumber1Li>
      </RegisterNumber1Ul>
      <RegisterNumber1Ul>
        <RegisterNumber1Li>
          <RegisterNumber1Label>기술 스택</RegisterNumber1Label>
          <Select placeholder="프로젝트 사용 스택" options={optionStack} />
        </RegisterNumber1Li>
        <RegisterNumber1Li>
          <RegisterNumber1Label>시작 예정일</RegisterNumber1Label>
          <Select placeholder={dateString} />
          <AiOutlineCalendar onClick={onClickCalendar} />
          {calendarOpen && <Calendar />}
        </RegisterNumber1Li>
      </RegisterNumber1Ul>
      <RegisterNumber1Ul>
        <RegisterNumber1Li>
          <RegisterNumber1Label>연락 방법</RegisterNumber1Label>
          <Select placeholder="연락 방법" options={optionContact} />
          <RegisterNumber1ContactInput placeholder="작업 해야됨" />
        </RegisterNumber1Li>
        <RegisterNumber1Li>
          <RegisterNumber1Label></RegisterNumber1Label>
        </RegisterNumber1Li>
      </RegisterNumber1Ul>
    </section>
  );
}

export default RegisterNumber1;
