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
import { setEditingPost } from "../../slice/userSlice";
import getUserInfo from "../../util/getUserInfo";
import postFormSubmit from "../../util/postFormSubmit";
import wrongRequest from "../../util/wrongRequest";
import { toast } from "react-toastify";

function RegisterContainer() {
  const { editingPost, user } = useSelector((state) => {
    return state.user;
  });
  const [dataForm, steDataForm] = useState({
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
      const isAccessTokenValid = userInfo.data.code === 1;
      const isAccessTokenExpired = userInfo.data.code === 2;
      const isAccessTokenInvalid = userInfo.data.code === -1;
      if (isAccessTokenInvalid) {
        wrongRequest(dispatch, navigate);
        return;
      }
      if (isAccessTokenExpired) {
        const nextUserInfo = await getUserInfo(
          user.data,
          getCookie("refreshToken")
        );
        const isRefreshTokenValid = nextUserInfo.data.code === 1;
        const isRefreshTokenExpired = nextUserInfo.data.code === 2;
        const isRefreshTokenInvalid = nextUserInfo.data.code === -1;
        if (isRefreshTokenExpired || isRefreshTokenInvalid) {
          wrongRequest(dispatch, navigate);
          return;
        }
        if (isRefreshTokenValid) {
          setCookie("jwtToken", nextUserInfo.data.data);
          const response = await postFormSubmit(
            submitForm,
            getCookie("jwtToken")
          );
          const isNewAccessTokenValid = response.data.code === 1;
          const isNewAccessTokenInvalid = response.data.code === -1;
          if (isNewAccessTokenValid) {
            dispatch(setEditingPost({}));
            toast.success("등록이 완료되었습니다.");
            navigate("/");
          }
          if (isNewAccessTokenInvalid) {
            dispatch(setEditingPost({}));
            toast.error("알 수 없는 오류로 등록에 실패하였습니다.");
            navigate("/");
          }
        }
        return;
      }
      if (isAccessTokenValid) {
        const response = await postFormSubmit(
          submitForm,
          getCookie("jwtToken")
        );
        const isRegisterSuccess = response.data.code === 1;
        const isRegisterFail = response.data.code === -1;
        if (isRegisterSuccess) {
          dispatch(setEditingPost({}));
          toast.success("등록이 완료되었습니다.");
          navigate("/");
        } else if (isRegisterFail) {
          dispatch(setEditingPost({}));
          toast.error("알 수 없는 오류로 등록에 실패하였습니다.");
          navigate("/");
        }
        return;
      }
    }
  };
  return (
    <RegisterContainerDiv>
      <RegisterNumber1 dataForm={dataForm} setDataForm={steDataForm} />
      <RegisterNumber2 titleText={titleText} setTitleText={setTitleText} />
      <Editor editorValue={editorValue} setEditorValue={setEditorValue} />
      <RegisterBottomBtn onSubmit={onSubmit} />
    </RegisterContainerDiv>
  );
}

export default RegisterContainer;
