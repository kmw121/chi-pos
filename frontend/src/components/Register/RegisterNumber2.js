import React from "react";
import {
  RegisterNumber2NameInput,
  RegisterNumber2Title,
  RegisterNumber2TitleText,
  RegisterNumber2TitleCircle,
  RegisterNumber2NameLabel,
  RegisterWarningBox,
} from "./registerComponents";

function RegisterNumber2({ titleText, setTitleText, dataFormReg }) {
  const onChangeInputV = (e) => {
    setTitleText(e.target.value);
  };
  return (
    <section>
      <RegisterNumber2Title>
        <RegisterNumber2TitleCircle>2</RegisterNumber2TitleCircle>
        <RegisterNumber2TitleText>
          프로젝트에 대해 소개해주세요.
        </RegisterNumber2TitleText>
      </RegisterNumber2Title>
      <RegisterNumber2NameLabel>제목</RegisterNumber2NameLabel>
      <RegisterNumber2NameInput
        onChange={onChangeInputV}
        value={titleText || ""}
        placeholder="글 제목을 입력해주세요!"
      />
      {!titleText && dataFormReg.title && (
        <RegisterWarningBox>제목을 입력해 주세요 !</RegisterWarningBox>
      )}
    </section>
  );
}

export default RegisterNumber2;
