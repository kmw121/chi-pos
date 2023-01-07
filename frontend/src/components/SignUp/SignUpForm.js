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
  SignUpInput,
  SignUpInputContainer,
  SignUpInputImg,
} from "../components";
import Select from "react-select";
import { stacks } from "../../util/stack";
import axios from "axios";
import { API_URL } from "../../util/API_URL";
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
  });
  const [dupCheck, setDupCheck] = useState({
    username: false,
    nickName: false,
  });
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
    if (
      formReg.username &&
      formReg.nickName &&
      formReg.passwordAgain &&
      formReg.password &&
      dupCheck.nickName &&
      dupCheck.username &&
      form.stack.length
    ) {
      try {
        const formdata = new FormData();
        //이부분 리팩토링 필요.
        formdata.append("file", files);
        formdata.append("username", form.username);
        formdata.append("password", form.password);
        formdata.append("nickName", form.nickName);
        formdata.append("stack", form.stack);

        const res = await axios({
          method: "POST",
          url: API_URL + "/signup",
          mode: "cors",
          headers: { "Content-Type": "multipart/form-data" },
          data: formdata,
        });
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
        console.log(err);
        throw new Error(err);
      }
    } else {
      alert("회원 정보를 확인해주세요 ! ");
    }
  };

  const onDupCheckEmail = async () => {
    if (formReg.username) {
      try {
        const res = await axios.post(API_URL + "/dupUsername", {
          username: form.username,
        });
        if (res.data.code === -1) {
          if (
            window.confirm(`사용할 수 있는 이메일입니다.
  사용하시겠습니까?`)
          ) {
            setDupCheck((prev) => {
              return { ...prev, username: true };
            });
            alert("이메일을 설정하셨습니다.");
          } else {
            alert("취소되었습니다.");
          }
        } else if (res.data.code === 1) {
          alert("이미 존재하는 이메일입니다.");
        }
      } catch (err) {
        throw new Error(err);
      }
    } else {
      alert("이메일 형식을 확인해주세요!");
    }
  };
  const onDupCheckNickName = async () => {
    if (formReg.nickName) {
      try {
        const res = await axios.post(API_URL + "/dupNickName", {
          nickName: form.nickName,
        });
        if (res.data.code === -1) {
          if (
            window.confirm(`사용할 수 있는 닉네임입니다.
  사용하시겠습니까?`)
          ) {
            setDupCheck((prev) => {
              return { ...prev, nickName: true };
            });
            alert("닉네임을 설정하셨습니다.");
          } else {
            alert("취소되었습니다.");
          }
        } else if (res.data.code === 1) {
          alert("이미 존재하는 닉네임입니다.");
        }
      } catch (err) {
        throw new Error(err);
      }
    } else {
      alert("닉네임은 2글자 이상입니다.");
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
  console.log("files : ", files);
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
            options={stackArray}
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
