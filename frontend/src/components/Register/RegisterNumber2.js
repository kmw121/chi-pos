import React from "react";
import {
  RegisterNumber2NameInput,
  RegisterNumber2Title,
  RegisterNumber2TitleText,
  RegisterNumber2TitleCircle,
  RegisterNumber2NameLabel,
} from "./registerComponents";

function RegisterNumber2({ titleText, setTitleText }) {
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
        value={titleText || undefined}
        placeholder="글 제목을 입력해주세요!"
      />
    </section>
  );
}

export default RegisterNumber2;
