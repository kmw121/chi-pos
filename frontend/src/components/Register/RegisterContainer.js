import React, { useState } from "react";
import Editor from "./Editor";
import RegisterNumber1 from "./RegisterNumber1";
import RegisterNumber2 from "./RegisterNumber2";
import RegisterBottomBtn from "./RegisterBottomBtn";
import { RegisterContainerDiv } from "../components";
function RegisterContainer() {
  // Register number1 안에있는 state들 여기에다 선언 후 props로 내려서
  // state management 해야됨.
  // submitform에 state 담아서 props로 RegisterBottomBtn 컴포넌트에 전달할것.
  const [titleText, setTitleText] = useState("");
  const [editorValue, setEditorValue] = useState("");
  // const submitForm = {
  //   category: "",
  //   people: "",
  //   howto: "",
  //   duration: "",
  //   stack: selectedStack,
  //   startDate: datePickerValue,
  //   contact: "",
  //   title: "",
  //   detail: "",
  // };

  return (
    <RegisterContainerDiv>
      <RegisterNumber1 />
      <RegisterNumber2 titleText={titleText} setTitleText={setTitleText} />
      <Editor editorValue={editorValue} setEditorValue={setEditorValue} />
      <RegisterBottomBtn
      //  submitForm={submitForm}
      />
    </RegisterContainerDiv>
  );
}

export default RegisterContainer;
