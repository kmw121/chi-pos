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
} from "./registerComponents";
import { getYear, getMonth } from "date-fns";
import DatePicker from "react-datepicker";
import "./customDatePickerWidth.css";
import { registerOption } from "../../util/registerOption";

function RegisterNumber1({ dataForm, setDataForm }) {
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
  const handleChangeForm = (value, e) => {
    setDataForm({ ...dataForm, [e.name]: value.value });
  };
  const handleChangeFormStack = (value, e) => {
    setDataForm({ ...dataForm, [e.name]: value });
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
            onChange={handleChangeForm}
            name="category"
            placeholder="스터디/프로젝트"
            options={registerOption.category}
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
            onChange={handleChangeForm}
            placeholder="인원 미정~10명 이상"
            name="people"
            options={registerOption.people}
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
            onChange={handleChangeForm}
            placeholder="온라인/오프라인"
            name="howto"
            options={registerOption.howTo}
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
            onChange={handleChangeForm}
            placeholder="기간 미정~6개월 이상"
            options={registerOption.duration}
            name="duration"
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
            onChange={handleChangeFormStack}
            isMulti
            placeholder="프로젝트 사용 스택"
            name="selectedStack"
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
              name="datePickerValue"
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
            name="contactOption"
            placeholder="연락 방법"
            options={registerOption.contact}
            value={registerOption.contact.find((op) => {
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
            name="contact???"
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
