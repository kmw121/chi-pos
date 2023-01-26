import React, { useEffect, useState } from "react";
import Editor from "./Editor";
import RegisterNumber1 from "./RegisterNumber1";
import RegisterNumber2 from "./RegisterNumber2";
import RegisterBottomBtn from "./RegisterBottomBtn";
import { RegisterContainerDiv } from "../components";
import authCheck from "../../util/authCheck";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toStringByFormatting from "../../util/toStringByFormatting";
import { getCookie, setCookie } from "../../util/cookie";
import { setCurrentPost } from "../../slice/userSlice";
import getUserInfo from "../../util/getUserInfo";
import postFormSubmit from "../../util/postFormSubmit";
import wrongRequest from "../../util/wrongRequest";
import { toast, ToastContainer } from "react-toastify";

function RegisterContainer() {
  const { currentPost } = useSelector((state) => {
    return state.user;
  });
  const [dataForm, steDataForm] = useState({
    category: currentPost.categoryType,
    people: currentPost.people,
    howto: currentPost.howto,
    duration: currentPost.duration,
    selectedStack: currentPost.postStack
      ? currentPost.postStack.map((a) => {
          return {
            value: a.stack.name,
            label: a.stack.name,
            number: a.stack.id,
          };
        })
      : [],
    contactOption: currentPost.contact,
    contactPlaceholder: currentPost.contact,
    contactAddress: currentPost.contactAddress,
    // invalid date error 처리 필요함 ㅡㅡ
    datePickerValue:
      // !new Date(currentPost.startDate)
      // ?
      new Date(),
    //: new Date(currentPost.startDate),
  });
  const [titleText, setTitleText] = useState(currentPost.title);
  const [editorValue, setEditorValue] = useState(currentPost.detail);
  const submitForm = {
    id: !currentPost.id ? null : currentPost.id,
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
  const { user } = useSelector((state) => {
    return state.user;
  });
  useEffect(() => {
    authCheck(dispatch, navigate, user);
  }, []);
  // 이거 수정하고 authCheck도 수정 T_T
  const onSubmit = async () => {
    if (user.data.code === 1) {
    }
    const userInfo = await getUserInfo(user, getCookie("jwtToken"));
    if (userInfo.data.code === -1) {
      wrongRequest(dispatch, navigate);
    } else if (userInfo.data.code === 2) {
      const nextUserInfo = await getUserInfo(user, getCookie("refreshToken"));
      if (nextUserInfo.data.data === 2 || nextUserInfo.data.data === -1) {
        wrongRequest(dispatch, navigate);
      } else if (nextUserInfo.data.data === 1) {
        setCookie("jwtToken", nextUserInfo.data.data);
        const response = await postFormSubmit(
          submitForm,
          getCookie("jwtToken")
        );
        if (response.data.code === 1) {
          dispatch(setCurrentPost({}));
          toast.success("등록이 완료되었습니다.");
          navigate("/");
        } else if (response.data.code === -1) {
          dispatch(setCurrentPost({}));
          toast.error("알 수 없는 오류로 등록에 실패하였습니다.");
          navigate("/");
        }
      }
    } else if (userInfo.data.code === 1) {
      const response = await postFormSubmit(submitForm, getCookie("jwtToken"));
      if (response.data.code === 1) {
        dispatch(setCurrentPost({}));
        toast.success("등록이 완료되었습니다.");
        navigate("/");
      } else if (response.data.code === -1) {
        dispatch(setCurrentPost({}));
        toast.error("알 수 없는 오류로 등록에 실패하였습니다.");
        navigate("/");
      }
    }
    //   dispatch(setUserInfo(userInfo.data));
  };
  return (
    <>
      <RegisterContainerDiv>
        <RegisterNumber1 dataForm={dataForm} setDataForm={steDataForm} />
        <RegisterNumber2 titleText={titleText} setTitleText={setTitleText} />
        <Editor editorValue={editorValue} setEditorValue={setEditorValue} />
        <RegisterBottomBtn onSubmit={onSubmit} />
      </RegisterContainerDiv>
      <ToastContainer />
    </>
  );
}

export default RegisterContainer;
