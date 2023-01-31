import React, { useState } from "react";
import {
  SignUpFormTitle,
  SignUpFormLabel,
  SignUpFormLi,
  SignUpFormUl,
  SignUpInput,
  SignUpInputContainer,
  SignUpInputImg,
  SignUpFormRegWarning,
} from "../SignUp/signUpComponents";
import {
  RegisterContainerDiv,
  RegisterNumber2TitleCircle,
  RegisterNumber2TitleText,
  RegisterBottomSection,
  RegisterBottomCancelBtn,
  RegisterBottomOkBtn,
} from "../Register/registerComponents";
import { ImgPreview } from "../Google/socialButton";
import { stackArrayWithNumber } from "../../util/stack";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { getCookie, deleteCookie } from "../../util/cookie";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import postDupCheckNick from "../../util/postDupCheckNick";
import postSocialSignUp from "../../util/postSocialSignUp";

const reg_nickName = /^[\w\Wㄱ-ㅎㅏ-ㅣ가-힣]{2,10}$/;

function KakaoSignUp() {
  const [formReg, setFormReg] = useState({
    username: true,
    password: false,
    passwordAgain: false,
    nickName: false,
    dupCheckNickName: false,
  });
  const [form, setForm] = useState({
    username: getCookie("Kakao"),
    password: "",
    passwordAgain: "",
    nickName: "",
    stack: [],
    imgPreview: "",
    files: [],
  });
  const navigate = useNavigate();
  const onGoBack = () => {
    deleteCookie("Kakao");
    navigate("/");
    toast.error("취소하셨습니다. 다시 시도해주세요.");
  };
  const dispatch = useDispatch();
  const onSelectedStack = (value) => {
    setForm((prev) => {
      return { ...prev, stack: value.map((a) => a.number) };
    });
  };
  const onChangeNickName = (e) => {
    setForm((prev) => {
      return { ...prev, nickName: e.target.value };
    });
    setFormReg((prev) => {
      return {
        ...prev,
        nickName: reg_nickName.test(e.target.value),
      };
    });
  };
  const onSubmit = async () => {
    if (
      formReg.username &&
      formReg.nickName &&
      formReg.dupCheckNickName &&
      form.stack.length
    ) {
      try {
        const formdata = new FormData();
        if (form.imgPreview.length) {
          formdata.append("file", form.files);
        }
        formdata.append("username", form.username);
        formdata.append("nickName", form.nickName);
        formdata.append("stack", form.stack);
        await postSocialSignUp(formdata, "/kakaoSignup", dispatch, navigate);
      } catch {
        toast.error("알 수 없는 오류로 회원 가입에 실패하였습니다.");
      }
    } else {
      toast.error("회원 정보를 확인해주세요 ! ");
    }
  };
  const onDupCheckNickName = async () => {
    if (formReg.nickName) {
      try {
        await postDupCheckNick(form, setFormReg);
      } catch (err) {
        throw new Error(err);
      }
    } else {
      toast.error("닉네임은 2글자 이상 10글자 이하입니다.");
    }
  };
  const encodeFileToBase64 = (fileBlob) => {
    const reader = new FileReader();
    setForm((prev) => {
      return { ...prev, files: fileBlob };
    });
    reader.readAsDataURL(fileBlob);
    return new Promise((resolve) => {
      reader.onload = () => {
        setForm((prev) => {
          return { ...prev, imgPreview: reader.result };
        });
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
            disabled={formReg.dupCheckNickName}
          />
          {form.nickName && !formReg.nickName && (
            <SignUpFormRegWarning>
              닉네임은 2글자 이상 10글자 이하입니다.
            </SignUpFormRegWarning>
          )}
        </SignUpFormLi>
      </SignUpFormUl>
      <SignUpFormUl>
        <SignUpFormLi>
          <Select
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
                <ImgPreview src={form.imgPreview} alt="preview-img" />
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

export default KakaoSignUp;
