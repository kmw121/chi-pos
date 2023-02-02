import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  SignUpFormTitle,
  SignUpFormLabel,
  SignUpFormLi,
  SignUpFormUl,
  SignUpInput,
  SignUpInputContainer,
  SignUpInputImg,
  SignUpImgPreview,
  SignUpFormRegWarning,
} from "./signUpComponents";
import {
  RegisterContainerDiv,
  RegisterNumber2TitleCircle,
  RegisterNumber2TitleText,
  RegisterBottomSection,
  RegisterBottomCancelBtn,
  RegisterBottomOkBtn,
} from "../Register/registerComponents";
import Select from "react-select";
import { stackArrayWithNumber } from "../../util/stack";
import postSubmit from "../../util/postSubmit";
import { toast } from "react-toastify";
import postDupCheckNick from "../../util/postDupCheckNick";
import postDupCheckEmail from "../../util/postDupCheckEmail";

const reg_username = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
const reg_password = /^[\w\Wㄱ-ㅎㅏ-ㅣ가-힣]{5,15}$/;
const reg_nickName = /^[\w\Wㄱ-ㅎㅏ-ㅣ가-힣]{2,10}$/;

function SignUpForm({ toggleModal, modalOpen }) {
  const [formReg, setFormReg] = useState({
    username: true,
    password: true,
    passwordAgain: true,
    nickName: true,
    dupCheckUsername: false,
    dupCheckNickName: false,
  });
  const [form, setForm] = useState({
    username: "",
    password: "",
    passwordAgain: "",
    nickName: "",
    stack: [],
    files: [],
    imgPreview: "",
  });
  const navigate = useNavigate();
  const onGoBack = () => {
    navigate(-1);
  };
  const onSelectedStack = (value) => {
    setForm((prev) => {
      return { ...prev, stack: value.map((a) => a.number) };
    });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };
  const onSubmit = async () => {
    setFormReg((prev) => {
      return {
        ...prev,
        username: reg_username.test(form.username),
        password: reg_password.test(form.password),
        passwordAgain:
          form.password !== "" &&
          form.passwordAgain !== "" &&
          form.password === form.passwordAgain,
        nickName: reg_nickName.test(form.nickName),
      };
    });
    if (
      formReg.username &&
      formReg.nickName &&
      formReg.passwordAgain &&
      formReg.password &&
      formReg.dupCheckUsername &&
      formReg.dupCheckNickName &&
      form.stack.length
    ) {
      try {
        const formdata = new FormData();
        if (form.imgPreview.length) {
          formdata.append("file", form.files);
        }
        formdata.append("username", form.username);
        formdata.append("password", form.password);
        formdata.append("nickName", form.nickName);
        formdata.append("stack", form.stack);
        await postSubmit(formdata, navigate, toggleModal, setFormReg);
      } catch {
        toast.error(`알 수 없는 오류로 회원가입에 실패하였습니다.`);
      }
    } else {
      toast.error("회원 정보를 확인해주세요 !");
    }
  };
  const onDupCheckEmail = async () => {
    const isRegEmail = reg_username.test(form.username);
    if (isRegEmail) {
      try {
        await postDupCheckEmail(form, setFormReg);
      } catch {
        toast.error("알 수 없는 오류로 이메일 중복확인에 실패하였습니다.");
      }
    } else {
      toast.error("이메일 칸이 공백이거나 이메일 형식이 올바르지 않습니다.");
    }
  };
  const onDupCheckNickName = async () => {
    const isRegNickName = reg_nickName.test(form.nickName);
    if (isRegNickName) {
      try {
        await postDupCheckNick(form, setFormReg);
      } catch {
        toast.error("알 수 없는 오류로 닉네임 중복확인에 실패하였습니다.");
      }
    } else {
      toast.error("닉네임은 2글자 이상 ~ 10글자 이하로 해주세요!");
    }
  };
  const encodeFileToBase64 = (fileBlob) => {
    const reader = new FileReader();
    setForm({ ...form, files: fileBlob });
    reader.readAsDataURL(fileBlob);
    return new Promise((resolve) => {
      reader.onload = () => {
        setForm({ ...form, imgPreview: reader.result });
        resolve();
      };
    });
  };
  return (
    <RegisterContainerDiv>
      <SignUpFormTitle>
        <RegisterNumber2TitleCircle>✩</RegisterNumber2TitleCircle>
        <RegisterNumber2TitleText>
          &nbsp; 회원 정보를 입력해주세요.
        </RegisterNumber2TitleText>
      </SignUpFormTitle>
      <SignUpFormUl>
        <SignUpFormLi>
          <SignUpFormLabel>
            <span>이메일</span>
            <button
              className="signUpBtn"
              onClick={() => {
                onDupCheckEmail();
              }}
            >
              중복확인
            </button>
          </SignUpFormLabel>
          <SignUpInput
            value={form.username}
            onChange={handleChange}
            placeholder="ex ) ABCD1234@naver.com"
            disabled={formReg.dupCheckUsername}
            name="username"
          />
          {!formReg.username && (
            <SignUpFormRegWarning>
              이메일 형식을 확인해주세요.
            </SignUpFormRegWarning>
          )}
        </SignUpFormLi>
        <SignUpFormLi>
          <SignUpFormLabel>
            <span>닉네임</span>
            <button onClick={onDupCheckNickName} className="signUpBtn">
              중복확인
            </button>
          </SignUpFormLabel>
          <SignUpInput
            onChange={handleChange}
            value={form.nickName}
            placeholder=""
            disabled={formReg.dupCheckNickName}
            name="nickName"
          />
          {!formReg.nickName && (
            <SignUpFormRegWarning>
              닉네임 형식을 확인해주세요.
            </SignUpFormRegWarning>
          )}
        </SignUpFormLi>
      </SignUpFormUl>
      <SignUpFormUl>
        <SignUpFormLi>
          <SignUpFormLabel>비밀번호</SignUpFormLabel>
          <SignUpInput
            onChange={handleChange}
            value={form.password}
            maxLength="15"
            type="password"
            placeholder=""
            name="password"
          />
          {!formReg.password && (
            <SignUpFormRegWarning>
              비밀번호 형식을 확인해주세요.
            </SignUpFormRegWarning>
          )}
        </SignUpFormLi>
        <SignUpFormLi>
          <SignUpFormLabel>비밀번호 확인</SignUpFormLabel>
          <SignUpInput
            onChange={handleChange}
            value={form.passwordAgain}
            maxLength="15"
            type="password"
            placeholder=""
            name="passwordAgain"
          />
          {!formReg.passwordAgain && (
            <SignUpFormRegWarning>
              비밀번호가 일치하지 않습니다.
            </SignUpFormRegWarning>
          )}
        </SignUpFormLi>
      </SignUpFormUl>
      <SignUpFormUl>
        <SignUpFormLi>
          <Select
            className="react-select-signup"
            onChange={onSelectedStack}
            isMulti
            placeholder="프로젝트 사용 스택"
            options={stackArrayWithNumber}
          />
        </SignUpFormLi>
        <SignUpFormLi>
          <SignUpFormLabel>프로필 사진</SignUpFormLabel>
          <SignUpInputContainer>
            <SignUpInputImg
              onChange={(e) => {
                encodeFileToBase64(e.target.files[0]);
              }}
              type="file"
              accept="img/*"
            />
            <div className="img_box">
              {form.imgPreview && (
                <SignUpImgPreview src={form.imgPreview} alt="preview-img" />
              )}
            </div>
          </SignUpInputContainer>
        </SignUpFormLi>
      </SignUpFormUl>
      <RegisterBottomSection>
        <RegisterBottomCancelBtn onClick={onGoBack}>
          취소
        </RegisterBottomCancelBtn>
        <RegisterBottomOkBtn onClick={onSubmit}>회원가입</RegisterBottomOkBtn>
      </RegisterBottomSection>
    </RegisterContainerDiv>
  );
}

export default SignUpForm;
