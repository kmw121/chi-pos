import {
  SettingContainer,
  SettingImgBox,
  SettingImg,
  SettingImgBtnBox,
  SettingImgBtnBoxBtn,
  SettingImgBtnBoxLabel,
  SettingTitleBox,
  SettingTitleBoxInput,
  SettingDescription,
  SettingStackBox,
  SettingCompleteBtn,
  SettingWithdrawalBtn,
} from "../components";
import { stacks } from "../../util/stack";
import Select from "react-select";
import { useEffect, useState } from "react";
import MainHead from "../Main/MainHead";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import withdrawal from "../../util/withdrawal";
import axios from "axios";
import { API_URL } from "../../util/API_URL";
import { getCookie } from "../../util/cookie";
function SettingDetail() {
  const { userInfo } = useSelector((state) => {
    return state.user;
  });
  useEffect(() => {
    if (userInfo && userInfo.data.nickName !== undefined) {
      setNick(() => userInfo.data.nickName);
    }
  }, []);
  const reg_password = /^[\w\Wㄱ-ㅎㅏ-ㅣ가-힣]{5,15}$/;
  const reg_nickName = /^[\w\Wㄱ-ㅎㅏ-ㅣ가-힣]{2,10}$/;
  const [stack, setStack] = useState(
    userInfo.data.userStack
      .map((a) => a.stack.name)
      .map((a) => {
        return { label: a, value: a };
      })
  );
  console.log("stack : ", stack);
  const [nick, setNick] = useState("");
  const [prePassword, setPrepassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordAgain, setNewPasswordAgain] = useState("");
  const [imgPreview, setImgPreview] = useState("");
  const [files, setFiles] = useState(userInfo.data.imageUrl);
  const [formReg, setFormReg] = useState({
    prePassword: false,
    newPassword: false,
    newPasswordAgain: false,
  });
  const handlePrePassword = (e) => {
    setPrepassword(e.target.value);
    const prePasswordReg = (prev) => {
      return { ...prev, prePassword: reg_password.test(e.target.value) };
    };
    setFormReg(prePasswordReg);
  };
  const handleNewPassword = (e) => {
    setNewPassword(e.target.value);
    const newPasswordReg = (prev) => {
      return { ...prev, newPassword: reg_password.test(e.target.value) };
    };
    setFormReg(newPasswordReg);
  };
  const handleNewPasswordAgain = (e) => {
    setNewPasswordAgain(e.target.value);
    const newPasswordAgainReg = (prev) => {
      return { ...prev, newPasswordAgain: reg_password.test(e.target.value) };
    };
    setFormReg(newPasswordAgainReg);
  };
  const stackArray = stacks
    .map((stack) => stack.name)
    .map((a) => {
      return {
        value: a,
        label: a,
      };
    });
  // [1,2,3,4,5] 이렇게 숫자로 만드는법... 고민...
  const aaa = stacks.map((a) => {
    return { number: a.number, name: a.name };
  });
  const beforeStack = new Set([...stack]);
  const onChangeNickName = (e) => {
    setNick(nick);
  };
  const optionStack = stackArray;
  const onSelectedStack = (value) => {
    setStack((prev) => prev.concat(value));
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const encodeFileToBase64 = (fileBlob) => {
    const reader = new FileReader();
    setFiles(fileBlob);
    reader.readAsDataURL(fileBlob);
    return new Promise((resolve) => {
      reader.onload = () => {
        setImgPreview(reader.result);
        resolve();
      };
    });
  };
  const onSubmit = async () => {
    if (formReg.prePassword) {
      try {
        const formdata = new FormData();
        formdata.append("file", files);
        formdata.append("nickname", nick);
        formdata.append("password", newPassword);
        formdata.append("stack");
        formdata.append("prePassword", prePassword);
        const res = await axios({
          method: "POST",
          url: API_URL + "/changeInfo",
          mode: "cors",
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `${getCookie("refreshToken")}`,
          },
          data: formdata,
        });
        console.log("res : ", res);
      } catch (e) {
        throw new Error(e);
      }
    }
  };
  return (
    <>
      <MainHead />
      <SettingContainer>
        <h1>내 정보 수정</h1>
        <SettingImgBox>
          <SettingImg
          // src={API_URL + userInfo.data.imageUrl}
          // alt="asdfasdfasdfasdfasdf"
          />
          <SettingImgBtnBox>
            <SettingImgBtnBoxLabel
              placeholder="이미지 선택"
              onChange={(e) => {
                encodeFileToBase64(e.target.files[0]);
              }}
              type="file"
              accept="img/*"
            />
            <SettingImgBtnBoxBtn>이미지 제거</SettingImgBtnBoxBtn>
          </SettingImgBtnBox>
        </SettingImgBox>
        <SettingTitleBox>
          <h3 style={{ width: "20rem" }}>닉네임</h3>
          <SettingTitleBoxInput
            placeholder=""
            value={nick}
            onChange={onChangeNickName}
          />
        </SettingTitleBox>
        <SettingDescription>
          '프로젝트 이름'에서 사용되는 닉네임입니다.
        </SettingDescription>
        <hr />
        <SettingStackBox>
          <h3 style={{ width: "20rem" }}>관심 기술 태그</h3>
          <div style={{ width: "300px" }}>
            <Select
              onChange={onSelectedStack}
              isMulti
              placeholder="관심 태그 선택"
              options={optionStack}
              defaultValue={stack}
            />
          </div>
        </SettingStackBox>
        <SettingDescription>
          관심 있는 기술 태그를 등록해주세요.
        </SettingDescription>
        <hr />
        <SettingTitleBox>
          <h3 style={{ width: "20rem" }}>기존 비밀번호</h3>
          <SettingTitleBoxInput
            placeholder="기존 비밀번호를 입력해 주세요."
            value={prePassword}
            onChange={handlePrePassword}
          />
        </SettingTitleBox>
        <SettingDescription>
          정보 변경을 위하여 기존 비밀번호를 입력해 주세요.&nbsp;
          <strong style={{ color: "red" }}>(필수)</strong>
        </SettingDescription>
        <hr />
        <SettingTitleBox>
          <h3 style={{ width: "20rem" }}>변경할 비밀번호</h3>
          <SettingTitleBoxInput
            placeholder="변경할 비밀번호를 입력해 주세요."
            value={newPassword}
            onChange={handleNewPassword}
          />
        </SettingTitleBox>
        <SettingDescription>
          비밀번호를 변경하려면 변경할 비밀번호를 입력해 주세요.
        </SettingDescription>
        <hr />
        <SettingTitleBox>
          <h3 style={{ width: "20rem" }}>비밀번호 재입력</h3>
          <SettingTitleBoxInput
            placeholder="비밀번호를 다시 입력해 주세요."
            value={newPasswordAgain}
            onChange={handleNewPasswordAgain}
          />
        </SettingTitleBox>
        <SettingDescription>
          비밀번호를 변경하려면 변경할 비밀번호를 다시 입력해 주세요.
        </SettingDescription>
        <hr />

        <SettingCompleteBtn>완료</SettingCompleteBtn>
        <SettingWithdrawalBtn onClick={() => withdrawal(dispatch, navigate)}>
          회원탈퇴
        </SettingWithdrawalBtn>
      </SettingContainer>
    </>
  );
}

export default SettingDetail;
