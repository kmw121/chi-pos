import React from "react";
import Select from "react-select";
import { stacks } from "../../util/stack";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/locale";
import {
  RegisterNumber1ContactInput,
  RegisterNumber1Ul,
  RegisterNumber1Li,
  RegisterNumber1TitleCircle,
  RegisterNumber1Title,
  RegisterNumber1TitleText,
  RegisterNumber1Label,
} from "../components";
import { getYear, getMonth } from "date-fns";
import DatePicker from "react-datepicker";
import "./customDatePickerWidth.css";

function RegisterNumber1({ dataForm, setDataForm }) {
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
  const optionContact = [
    { value: "카카오톡 오픈채팅", label: "카카오톡 오픈채팅" },
    { value: "이메일", label: "이메일" },
    { value: "구글폼", label: "구글폼" },
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
  let stackNumber = 1;
  const stackArray = stacks
    .map((stack) => stack.name)
    .map((a) => {
      return {
        value: a,
        label: a,
        number: stackNumber++,
      };
    });
  const optionStack = stackArray;
  const onChangeCategory = (value) => {
    setDataForm((prev) => {
      return { ...prev, category: value.value };
    });
  };
  const onChangeHowto = (value) => {
    setDataForm((prev) => {
      return { ...prev, howto: value.value };
    });
  };
  const onChangeDuration = (value) => {
    setDataForm((prev) => {
      return { ...prev, duration: value.value };
    });
  };
  const onChangePeople = (value) => {
    setDataForm((prev) => {
      return { ...prev, people: value.value };
    });
  };
  const onSelectedStack = (value) => {
    setDataForm((prev) => {
      return { ...prev, selectedStack: value };
    });
  };
  const onChangeDatePickerValue = (date) => {
    setDataForm((prev) => {
      return { ...prev, datePickerValue: date };
    });
  };
  const onChangeContact = (value) => {
    setDataForm((prev) => {
      return { ...prev, contactOption: value, contactPlaceholder: value };
    });
  };
  const onChangeContactAddress = (e) => {
    setDataForm((prev) => {
      return { ...prev, contactAddress: e.target.value };
    });
  };
  const _ = require("lodash");
  const years = _.range(2022, getYear(new Date()) + 4, 1);
  const months = [
    "1월",
    "2월",
    "3월",
    "4월",
    "5월",
    "6월",
    "7월",
    "8월",
    "9월",
    "10월",
    "11월",
    "12월",
  ];
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
          <Select
            onChange={onChangeCategory}
            placeholder="스터디/프로젝트"
            options={optionCategory}
            defaultValue={
              dataForm.category && {
                name: dataForm.category,
                label: dataForm.category,
              }
            }
          />
        </RegisterNumber1Li>
        <RegisterNumber1Li>
          <RegisterNumber1Label>모집 인원</RegisterNumber1Label>
          <Select
            onChange={onChangePeople}
            placeholder="인원 미정~10명 이상"
            options={optionPeople}
            defaultValue={
              dataForm.people && {
                name: dataForm.people,
                label: dataForm.people,
              }
            }
          />
        </RegisterNumber1Li>
      </RegisterNumber1Ul>
      <RegisterNumber1Ul>
        <RegisterNumber1Li>
          <RegisterNumber1Label>진행 방식</RegisterNumber1Label>
          <Select
            onChange={onChangeHowto}
            placeholder="온라인/오프라인"
            options={optionHowTo}
            defaultValue={
              dataForm.howto && {
                name: dataForm.howto,
                label: dataForm.howto,
              }
            }
          />
        </RegisterNumber1Li>
        <RegisterNumber1Li>
          <RegisterNumber1Label>진행 기간</RegisterNumber1Label>
          <Select
            onChange={onChangeDuration}
            placeholder="기간 미정~6개월 이상"
            options={optionDuration}
            defaultValue={
              dataForm.duration && {
                name: dataForm.duration,
                label: dataForm.duration,
              }
            }
          />
        </RegisterNumber1Li>
      </RegisterNumber1Ul>
      <RegisterNumber1Ul>
        <RegisterNumber1Li>
          <RegisterNumber1Label>기술 스택</RegisterNumber1Label>
          <Select
            onChange={onSelectedStack}
            isMulti
            placeholder="프로젝트 사용 스택"
            options={optionStack}
            defaultValue={dataForm.selectedStack}
          />
        </RegisterNumber1Li>
        <RegisterNumber1Li>
          <RegisterNumber1Label>시작 예정일</RegisterNumber1Label>
          <div className="customDatePickerWidth">
            <DatePicker
              selected={dataForm.datePickerValue}
              onChange={onChangeDatePickerValue}
              showPopperArrow={false}
              fixedHeight
              locale={ko}
              dateFormat="yyyy년 MM월 dd일 (eee)"
              minDate={new Date()}
              renderCustomHeader={({
                date,
                changeYear,
                changeMonth,
                decreaseMonth,
                increaseMonth,
                prevMonthButtonDisabled,
                nextMonthButtonDisabled,
              }) => (
                <div className="registerDatePickerInner">
                  <button
                    onClick={decreaseMonth}
                    disabled={prevMonthButtonDisabled}
                  >
                    {"<"}
                  </button>
                  <select
                    value={getYear(date)}
                    onChange={({ target: { value } }) => changeYear(value)}
                  >
                    {years.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>

                  <select
                    value={months[getMonth(date)]}
                    onChange={({ target: { value } }) =>
                      changeMonth(months.indexOf(value))
                    }
                  >
                    {months.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>

                  <button
                    onClick={increaseMonth}
                    disabled={nextMonthButtonDisabled}
                  >
                    {">"}
                  </button>
                </div>
              )}
            />
          </div>
        </RegisterNumber1Li>
      </RegisterNumber1Ul>
      <RegisterNumber1Ul>
        <RegisterNumber1Li>
          <RegisterNumber1Label>연락 방법</RegisterNumber1Label>
          <Select
            defaultValue={{
              value: "카카오톡 오픈채팅",
              label: "카카오톡 오픈채팅",
            }}
            placeholder="연락 방법"
            options={optionContact}
            value={optionContact.find((op) => {
              return op.value === dataForm.contactOption;
            })}
            onChange={(value) => {
              onChangeContact(value.value);
            }}
          />
          <RegisterNumber1ContactInput
            placeholder={`${
              dataForm.contactPlaceholder === undefined
                ? "카카오톡 오픈채팅 "
                : dataForm.contactPlaceholder
            } 주소를 입력해 주세요.`}
            value={dataForm.contactAddress || ""}
            onChange={onChangeContactAddress}
          />
        </RegisterNumber1Li>
        <RegisterNumber1Li>
          <RegisterNumber1Label></RegisterNumber1Label>
        </RegisterNumber1Li>
      </RegisterNumber1Ul>
    </section>
  );
}

export default RegisterNumber1;
