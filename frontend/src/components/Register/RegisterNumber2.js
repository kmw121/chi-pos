import React, { useState } from "react";
import {
  RegisterNumber2NameInput,
  RegisterNumber2Title,
  RegisterNumber2TitleText,
  RegisterNumber2TitleCircle,
  RegisterNumber2NameLabel,
} from "../components";
function RegisterNumber2() {
  const [inputV, setInputV] = useState("");
  const onChangeInputV = (e) => {
    setInputV(e.target.value);
    console.log(`input value : ${inputV}`);
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
        value={inputV}
        placeholder="글 제목을 입력해주세요!"
      />
    </section>
  );
}

export default RegisterNumber2;
