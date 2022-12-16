import React from "react";
import Editor from "./Editor";
import RegisterNumber1 from "./RegisterNumber1";
import RegisterNumber2 from "./RegisterNumber2";
import RegisterBottomBtn from "./RegisterBottomBtn";
import { RegisterContainerDiv } from "../components";
function RegisterContainer() {
  return (
    <RegisterContainerDiv>
      <RegisterNumber1 />
      <RegisterNumber2 />
      <Editor />
      <RegisterBottomBtn />
    </RegisterContainerDiv>
  );
}

export default RegisterContainer;
