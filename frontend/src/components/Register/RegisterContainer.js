import React, { useState } from "react";
import Editor from "./Editor";
import RegisterNumber1 from "./RegisterNumber1";
import RegisterNumber2 from "./RegisterNumber2";
import RegisterBottomBtn from "./RegisterBottomBtn";
import { RegisterContainerDiv } from "../components";
function RegisterContainer() {
  const [dataForm, steDataForm] = useState({
    category: "",
    people: "",
    howto: "",
    duration: "",
    selectedStack: [],
    contactOption: "카카오톡 오픈채팅",
    contactPlaceholder: "카카오톡 오픈채팅",
    contactAddress: "",
    datePickerValue: new Date(),
  });
  const [titleText, setTitleText] = useState("");
  const [editorValue, setEditorValue] = useState("");
  const submitForm = {
    id: null,
    category: dataForm.category,
    people: dataForm.people,
    howto: dataForm.howto,
    duration: dataForm.duration,
    stack: dataForm.selectedStack.map((stack) => stack.number),
    startDate: dataForm.datePickerValue,
    contact: dataForm.contactOption,
    contactAddress: dataForm.contactAddress,
    title: titleText,
    detail: editorValue,
  };
  return (
    <RegisterContainerDiv>
      <RegisterNumber1 dataForm={dataForm} setDataForm={steDataForm} />
      <RegisterNumber2 titleText={titleText} setTitleText={setTitleText} />
      <Editor editorValue={editorValue} setEditorValue={setEditorValue} />
      <RegisterBottomBtn submitForm={submitForm} />
    </RegisterContainerDiv>
  );
}

export default RegisterContainer;
