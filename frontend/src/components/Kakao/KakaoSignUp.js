import React, { useState, useEffect } from "react";
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
  ImgPreview,
} from "../components";
import { stacks } from "../../util/stack";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { getCookie, deleteCookie, setCookie } from "../../util/cookie";
import { useDispatch } from "react-redux";
import jwt_decode from "jwt-decode";
import { fetchUser } from "../../slice/userSlice";
import postSocialSignUpAndDetail from "../../util/postSocialSignUpAndDetail";
import { toast, ToastContainer } from "react-toastify";
import postDupCheckNick from "../../util/postDupCheckNick";

function KakaoSignUp() {
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
  const reg_nickName = /^[\w\Wㄱ-ㅎㅏ-ㅣ가-힣]{2,10}$/;
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
        //이부분 리팩토링 필요.
        if (form.imgPreview.length) {
          formdata.append("file", form.files);
        }
        formdata.append("username", form.username);
        formdata.append("nickName", form.nickName);
        formdata.append("stack", form.stack);
        const kakaoSignUpResponse = await postSocialSignUpAndDetail(
          formdata,
          "/kakaoSignup"
        );
        if (kakaoSignUpResponse.data.code === 1) {
          const { accessToken, refreshToken } = kakaoSignUpResponse.data.data;
          setCookie("jwtToken", accessToken, {
            path: "/",
            domain: "chi-pos.com",
          });
          setCookie("refreshToken", refreshToken, {
            path: "/",
            domain: "chi-pos.com",
          });
          const decoded = jwt_decode(accessToken);
          dispatch(fetchUser(decoded));
          navigate("/");
          toast.success("카카오 회원가입이 완료되었습니다.");
        } else {
          if (kakaoSignUpResponse.data.code === -1) {
            toast.error("kakao 회원가입 실패 ");
          }
        }
      } catch (err) {
        throw new Error(err);
      }
    } else {
      toast.error("회원 정보를 확인해주세요 ! ");
    }
  };

  const onDupCheckNickName = async () => {
    if (formReg.nickName) {
      try {
        const dupCheckNick = await postDupCheckNick(form);
        if (dupCheckNick.data.code === -1) {
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
        } else if (dupCheckNick.data.code === 1) {
          toast.error("이미 존재하는 닉네임입니다.");
        }
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
    <>
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
      <ToastContainer />
    </>
  );
}

export default KakaoSignUp;
