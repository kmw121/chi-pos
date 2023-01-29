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
import { stacks } from "../../util/stack";
import postSubmit from "../../util/postSubmit";
import { toast } from "react-toastify";
import postDupCheckNick from "../../util/postDupCheckNick";
import postDupCheckEmail from "../../util/postDupCheckEmail";

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
  const reg_username = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
  const reg_password = /^[\w\Wㄱ-ㅎㅏ-ㅣ가-힣]{5,15}$/;
  const reg_nickName = /^[\w\Wㄱ-ㅎㅏ-ㅣ가-힣]{2,10}$/;
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
        const res = await postSubmit(formdata);
        if (res.data.code === 1) {
          toast.success("회원가입이 완료되었습니다.");
          navigate("/");
        } else {
          if (res.data.code === -1) {
            toast.error("회원가입에 실패하였습니다.");
            navigate("/");
          }
        }
      } catch (err) {
        throw new Error(err);
      }
    } else {
      toast.error("회원 정보를 확인해주세요 !.");
    }
  };
  const onDupCheckEmail = async () => {
    if (formReg.username) {
      try {
        const dupCheck = await postDupCheckEmail(form);
        if (dupCheck.data.code === -1) {
          if (
            window.confirm(`사용할 수 있는 이메일입니다. 사용하시겠습니까?`)
          ) {
            setFormReg((prev) => {
              return { ...prev, dupCheckUsername: true };
            });
            toast.success("이메일을 설정하셨습니다.");
          } else {
            toast.error("취소되었습니다.");
          }
        } else if (dupCheck.data.code === 1) {
          toast.error("이미 존재하는 이메일입니다.");
        }
      } catch (err) {
        throw new Error(err);
      }
    } else {
      toast.error("이메일 형식을 확인해주세요!");
    }
  };
  const onDupCheckNickName = async () => {
    if (formReg.nickName) {
      try {
        const dupCheck = await postDupCheckNick(form);
        if (dupCheck.data.code === -1) {
          if (
            window.confirm(`사용할 수 있는 닉네임입니다. 사용하시겠습니까?`)
          ) {
            setFormReg((prev) => {
              return { ...prev, dupCheckNickName: true };
            });
            toast.success("닉네임을 설정하셨습니다.");
          } else {
            toast.error("취소되었습니다.");
          }
        } else if (dupCheck.data.code === 1) {
          toast.error("이미 존재하는 닉네임입니다.");
        }
      } catch (err) {
        throw new Error(err);
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
  useEffect(() => {
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
  }, [form.username, form.nickName, form.password, form.passwordAgain]);
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
            disabled={form.dupCheckUsername}
            name="username"
          />
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
            disabled={form.dupCheckNickName}
            name="nickName"
          />
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
        </SignUpFormLi>
      </SignUpFormUl>
      <SignUpFormUl>
        <SignUpFormLi>
          <Select
            className="react-select-signup"
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
