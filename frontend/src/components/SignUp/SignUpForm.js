import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import {
  RegisterContainerDiv,
  RegisterNumber2TitleCircle,
  RegisterNumber2TitleText,
  RegisterBottomSection,
  RegisterBottomCancelBtn,
  RegisterBottomOkBtn,
  SignUpFormTitle,
  SignUpFormLabel,
  SignUpFormLi,
  SignUpFormUl,
} from "../components";
import Select from "react-select";
import { stacks } from "../../stack";
import axios from "axios";
const SignUpInput = styled.input`
  width: 80%;
  height: 40px;
  font-size: 20px;
  padding-left: 15px;
  margin-bottom: 10px;
  margin-top: 10px;
  display: flex;
  justify-content: center;
`;
const SignUpInputContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;
const SignUpInputImg = styled.input`
  height: 40px;
  font-size: 20px;
  padding-left: 15px;
  margin-bottom: 10px;
  margin-top: 10px;
  display: flex;
  justify-content: center;
`;
function SignUpForm() {
  let stackNumber = 1;
  const stackArray = stacks
    .map((stack) => stack.name)
    .map((a) => {
      return {
        value: a,
        label: a,
        number: stackNumber++,
      };
    });
  const optionStack = stackArray;
  const [formReg, setFormReg] = useState({
    username: false,
    password: false,
    passwordAgain: false,
    nickName: false,
  });
  const [imgPreview, setImgPreview] = useState("");
  const [files, setFiles] = useState([]);
  const [form, setForm] = useState({
    username: "",
    password: "",
    passwordAgain: "",
    nickName: "",
    stack: [],
    //  file: files[0],
  });
  const [dupCheck, setDupCheck] = useState({
    username: false,
    nickName: false,
  });
  // console.log(typeof imgFiles);
  // console.log("form : ", form);
  const reg_email =
    /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
  const reg_password = /^[\w\Wㄱ-ㅎㅏ-ㅣ가-힣]{5,15}$/;
  const reg_nickName = /^[\w\Wㄱ-ㅎㅏ-ㅣ가-힣]{2,10}$/;
  const navigate = useNavigate();
  const onGoBack = () => {
    navigate(-1);
  };
  const onChangeUsername = (e) => {
    const setUsername = (prev) => {
      return { ...prev, username: e.target.value };
    };
    setForm(setUsername);
    setUsername(e.target.value);
    const usernameReg = (prev) => {
      return { ...prev, username: reg_email.test(e.target.value) };
    };
    setFormReg(usernameReg);
  };
  const onSelectedStack = (value) => {
    setForm((prev) => {
      return { ...prev, stack: value.map((a) => a.number) };
    });
  };
  const onChangePassword = (e) => {
    const setPassword = (prev) => {
      return { ...prev, password: e.target.value };
    };
    setForm(setPassword);
    const passwordReg = (prev) => {
      return { ...prev, password: reg_password.test(e.target.value) };
    };
    setFormReg(passwordReg);
  };
  const onChangePasswordAgain = (e) => {
    const setPasswordAgain = (prev) => {
      return { ...prev, passwordAgain: e.target.value };
    };
    setForm(setPasswordAgain);
    const passwordAgainReg = (prev) => {
      return {
        ...prev,
        passwordAgain: prev.password === prev.passwordAgain,
      };
    };
    setFormReg(passwordAgainReg);
  };
  const onChangeNickName = (e) => {
    const setNickName = (prev) => {
      return { ...prev, nickName: e.target.value };
    };
    setForm(setNickName);
    const nickNameReg = (prev) => {
      return {
        ...prev,
        nickName: reg_nickName.test(e.target.value),
      };
    };
    setFormReg(nickNameReg);
  };
  const onSubmit = async () => {
    // 이 함수 util이나 hook으로 만들어서 쓸까? -> 고민해볼것.
    try {
      const formdata = new FormData();
      formdata.append("uploadImage", files[0]);
      const config = {
        Headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const res = await axios.post(
        "http://3.39.164.180:8080/signup",
        form,
        config
      );
      if (res.data.code === 1) {
        console.log(res);
        alert("어쩔말하는콩순이~");
        navigate("/");
      } else {
        if (res.data.code === -1) {
          alert("저쩔말하는콩순이");
          console.log(res);
        }
      }
    } catch (err) {
      throw new Error(err);
    }
  };

  const onDupCheckEmail = async () => {
    setDupCheck((prev) => {
      return { ...prev, username: true };
    });
    try {
      const res = await axios.post("http://localhost:8080/signup", {
        username: form.username,
      });
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };
  const onDupCheckNickName = async () => {
    setDupCheck((prev) => {
      return { ...prev, nickName: true };
    });
    try {
      const res = await axios.post("http://localhost:8080/signup", {
        nickName: form.nickName,
      });
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (
      form.password !== "" &&
      form.passwordAgain !== "" &&
      form.password === form.passwordAgain
    ) {
      setFormReg((prev) => {
        return { ...prev, passwordAgain: true };
      });
    }
  }, [form.passwordAgain]);
  console.log(typeof files, files);
  //이미지 미리보기 코드
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
              onClick={onDupCheckEmail}
              style={{ marginRight: "4.55rem" }}
            >
              중복확인
            </button>
          </SignUpFormLabel>
          <SignUpInput
            value={form.username}
            onChange={onChangeUsername}
            placeholder="ex ) ABCD1234@naver.com"
            disabled={dupCheck.username}
          />
        </SignUpFormLi>
        <SignUpFormLi>
          <SignUpFormLabel>
            <span>닉네임</span>
            <button
              onClick={onDupCheckNickName}
              style={{ marginRight: "4.55rem" }}
            >
              중복확인
            </button>
          </SignUpFormLabel>
          <SignUpInput
            onChange={onChangeNickName}
            value={form.nickName}
            placeholder=""
            disabled={dupCheck.nickName}
          />
        </SignUpFormLi>
      </SignUpFormUl>
      <SignUpFormUl>
        <SignUpFormLi>
          <SignUpFormLabel>비밀번호</SignUpFormLabel>
          <SignUpInput
            onChange={onChangePassword}
            value={form.password}
            maxLength="15"
            type="password"
            placeholder=""
          />
        </SignUpFormLi>
        <SignUpFormLi>
          <SignUpFormLabel>비밀번호 확인</SignUpFormLabel>
          <SignUpInput
            onChange={onChangePasswordAgain}
            value={form.passwordAgain}
            maxLength="15"
            type="password"
            placeholder=""
          />
        </SignUpFormLi>
      </SignUpFormUl>
      <SignUpFormUl>
        <SignUpFormLi>
          <Select
            onChange={onSelectedStack}
            isMulti
            placeholder="프로젝트 사용 스택"
            options={optionStack}
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
              {imgPreview && (
                <img
                  style={{ width: "60px", height: "60px" }}
                  src={imgPreview}
                  alt="preview-img"
                />
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
