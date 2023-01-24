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
import axios from "axios";
import { API_URL } from "../../util/API_URL";
import { getCookie, deleteCookie, setCookie } from "../../util/cookie";
import {
  setUserInfo,
  setUser,
  setCurrentPost,
  setIsLogin,
} from "../../slice/userSlice";
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
  const onSubmit = async () => {
    try {
      const res = await axios.get(API_URL + `/user/${user.id}`, {
        headers: {
          Authorization: `${getCookie("jwtToken")}`,
        },
      });
      if (res.data.code === -1) {
        deleteCookie(["jwtToken"]);
        deleteCookie(["refreshToken"]);
        dispatch(setCurrentPost({}));
        dispatch(setUserInfo([]));
        dispatch(setUser([]));
        dispatch(setIsLogin(false));
        alert("잘못된 요청입니다. 다시 로그인 하시길 바랍니다.");
        navigate("/");
      } else if (res.data.code === 2) {
        const nextRes = await axios.get(API_URL + `/user/${user.id}`, {
          headers: { Authorization: `${getCookie("refreshToken")}` },
        });
        if (nextRes.data.data === 2 || nextRes.data.data === -1) {
          deleteCookie(["jwtToken"]);
          deleteCookie(["refreshToken"]);
          dispatch(setCurrentPost({}));
          dispatch(setUserInfo([]));
          dispatch(setUser([]));
          alert("잘못된 접근입니다.");
          dispatch(setIsLogin(false));
          navigate("/");
        } else if (nextRes.data.data !== -1) {
          deleteCookie("jwtToken");
          setCookie("jwtToken", nextRes.data.data);
          try {
            const response = await axios.post(API_URL + "/post", submitForm, {
              headers: { Authorization: `${getCookie("jwtToken")}` },
            });
            if (response.data.code === 1) {
              dispatch(setCurrentPost({}));
              alert("등록이 완료되었습니다.");
              navigate("/");
            } else if (response.data.code === -1) {
              dispatch(setCurrentPost({}));
              alert("알 수 없는 오류로 등록에 실패하였습니다.");
              navigate("/");
            }
          } catch (err) {
            throw new Error(err);
          }
        }
      } else if (res.data.code === 1) {
        try {
          const response = await axios.post(API_URL + "/post", submitForm, {
            headers: { Authorization: `${getCookie("jwtToken")}` },
          });
          if (response.data.code === 1) {
            dispatch(setCurrentPost({}));
            alert("등록이 완료되었습니다.");
            navigate("/");
          } else if (response.data.code === -1) {
            dispatch(setCurrentPost({}));
            alert("알 수 없는 오류로 등록에 실패하였습니다.");
            navigate("/");
          }
        } catch (err) {
          throw new Error(err);
        }
      }
      dispatch(setUserInfo(res.data));
    } catch (err) {
      throw new Error(err);
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
