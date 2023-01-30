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
import { ImgPreview } from "./socialButton";
import { stackArrayWithNumber } from "../../util/stack";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { getCookie, deleteCookie } from "../../util/cookie";
import { useDispatch } from "react-redux";
import jwt_decode from "jwt-decode";
import { fetchUser } from "../../slice/userSlice";
import { toast } from "react-toastify";
import postSocialSignUpAndDetail from "../../util/postSocialSignUpAndDetail";
import postDupCheckNick from "../../util/postDupCheckNick";
import settingAuthCookies from "../../util/settingAuthCookies";

const reg_nickName = /^[\w\Wㄱ-ㅎㅏ-ㅣ가-힣]{2,10}$/;

function GoogleSignUp() {
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
    deleteCookie("Google");
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
        const googleResponse = await postSocialSignUpAndDetail(
          formdata,
          "/googleSignup"
        );
        const isSuccess = googleResponse.data.code === 1;
        const isFail = googleResponse.data.code === -1;
        if (isSuccess) {
          const { accessToken, refreshToken } = googleResponse.data.data;
          settingAuthCookies(accessToken, refreshToken, {
            path: "/",
            domain: "chi-pos.com",
          });
          const decoded = jwt_decode(accessToken);
          dispatch(fetchUser(decoded));
          navigate("/");
          toast.success("구글 회원가입이 완료되었습니다.");
          deleteCookie("Google");
          return;
        }
        if (isFail) {
          toast.error("구글 회원가입에 실패하였습니다.");
        }
      } catch (err) {
        toast.error(err);
      }
    } else {
      toast.error("회원 정보를 확인해주세요 !");
    }
  };
  const onDupCheckNickName = async () => {
    if (formReg.nickName) {
      try {
        const dupCheckNick = await postDupCheckNick(form);
        const isDupCheckSuccess = dupCheckNick.data.code === -1;
        const isDupCheckFail = dupCheckNick.data.code === 1;
        if (isDupCheckSuccess) {
          setFormReg((prev) => {
            return { ...prev, dupCheckNickName: true };
          });
          toast.success("닉네임을 설정하셨습니다.");
        } else if (isDupCheckFail) {
          toast.error("이미 존재하는 닉네임입니다.");
        }
      } catch (err) {
        toast.error(err);
      }
    } else {
      toast.error("닉네임은 2글자 이상 10글자 이하로 입력해 주세요.");
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
              )}{" "}
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

export default GoogleSignUp;
