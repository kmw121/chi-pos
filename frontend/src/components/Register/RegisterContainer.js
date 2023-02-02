import React, { useEffect, useState } from "react";
import Editor from "./Editor";
import RegisterNumber1 from "./RegisterNumber1";
import RegisterNumber2 from "./RegisterNumber2";
import RegisterBottomBtn from "./RegisterBottomBtn";
import { RegisterContainerDiv } from "./registerComponents";
import authCheck from "../../util/authCheck";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toStringByFormatting from "../../util/toStringByFormatting";
import { getCookie, setCookie } from "../../util/cookie";
import getUserInfo from "../../util/getUserInfo";
import postFormSubmit from "../../util/postFormSubmit";
import wrongRequest from "../../util/wrongRequest";
import {
  accessTokenValidate,
  refreshTokenValidate,
} from "../../util/tokenValidation";

function RegisterContainer() {
  const { editingPost, user } = useSelector((state) => {
    return state.user;
  });
  const [dataForm, setDataForm] = useState({
    category: editingPost.categoryType,
    people: editingPost.people,
    howto: editingPost.howto,
    duration: editingPost.duration,
    selectedStack: editingPost.postStack
      ? editingPost.postStack.map((a) => {
          return {
            value: a.stack.name,
            label: a.stack.name,
            number: a.stack.id,
          };
        })
      : [],
    contactOption: editingPost.contact,
    contactPlaceholder: editingPost.contact,
    contactAddress: editingPost.contactAddress,
    // invalid date error 처리 필요함 ㅡㅡ
    datePickerValue:
      // !new Date(currentPost.startDate)
      // ?
      new Date(),
    //: new Date(currentPost.startDate),
  });
  const [dataFormReg, setDataFormReg] = useState({
    categoryType: false,
    people: false,
    duration: false,
    howto: false,
    title: false,
    contactAddress: false,
    detail: false,
  });
  const [titleText, setTitleText] = useState(editingPost.title);
  const [editorValue, setEditorValue] = useState(editingPost.detail);
  const submitForm = {
    id: !editingPost.id ? null : editingPost.id,
    categoryType: dataForm.category,
    people: dataForm.people,
    howto: dataForm.howto,
    duration: dataForm.duration,
    stack: dataForm.selectedStack.map((stack) => stack.number),
    startDate: toStringByFormatting(new Date(dataForm.datePickerValue)),
    contact: !dataForm.contactOption
      ? "카카오톡 오픈채팅"
      : dataForm.contactOption,
    contactAddress: dataForm.contactAddress,
    title: titleText,
    detail: editorValue,
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    authCheck(dispatch, navigate, user);
  }, []);
  const onSubmit = async () => {
    if (user.code === 1) {
      const userInfo = await getUserInfo(user.data, getCookie("jwtToken"));
      const { accessValid, accessExpired, accessInvalid } = accessTokenValidate(
        userInfo
      );
      if (accessValid) {
        await postFormSubmit(
          submitForm,
          getCookie("jwtToken"),
          dispatch,
          navigate,
          setDataFormReg
        );
        return;
      }
      if (accessInvalid) {
        wrongRequest(dispatch, navigate);
        return;
      }
      if (accessExpired) {
        const nextUserInfo = await getUserInfo(
          user.data,
          getCookie("refreshToken")
        );
        const {
          refreshValid,
          refreshExpired,
          refreshInvalid,
        } = refreshTokenValidate(nextUserInfo);
        if (refreshExpired || refreshInvalid) {
          wrongRequest(dispatch, navigate);
          return;
        }
        if (refreshValid) {
          setCookie("jwtToken", nextUserInfo.data.data);
          await postFormSubmit(
            submitForm,
            nextUserInfo.data.data,
            dispatch,
            navigate,
            setDataFormReg
          );
          return;
        }
      }
    }
  };
  return (
    <RegisterContainerDiv>
      <RegisterNumber1
        dataFormReg={dataFormReg}
        setDataFormReg={setDataFormReg}
        dataForm={dataForm}
        setDataForm={setDataForm}
      />
      <RegisterNumber2
        dataFormReg={dataFormReg}
        titleText={titleText}
        setTitleText={setTitleText}
      />
      <Editor
        dataFormReg={dataFormReg}
        editorValue={editorValue}
        setEditorValue={setEditorValue}
      />
      <RegisterBottomBtn onSubmit={onSubmit} />
    </RegisterContainerDiv>
  );
}

export default RegisterContainer;
