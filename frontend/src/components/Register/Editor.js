import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../../App.css";
import { RegisterWarningBox } from "./registerComponents";

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ align: [] }],
    [{ color: [] }, { background: [] }],
    ["clean"],
  ],
};

export default function Editor({ editorValue, setEditorValue, dataFormReg }) {
  return (
    <>
      <ReactQuill
        modules={modules}
        theme="snow"
        value={editorValue}
        onChange={setEditorValue}
      />
      {!editorValue && dataFormReg.detail && (
        <RegisterWarningBox>내용을 입력해 주세요 ! </RegisterWarningBox>
      )}
    </>
  );
}
