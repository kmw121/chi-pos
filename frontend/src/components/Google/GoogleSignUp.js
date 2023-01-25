import React, { useState } from "react";
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
import { setUser, setUserInfo } from "../../slice/userSlice";
import { toast, ToastContainer } from "react-toastify";
import { injectStyle } from "react-toastify/dist/inject-style";
import getUserInfo from "../../util/getUserInfo";
import postSocialSignUpAndDetail from "../../util/postSocialSignUpAndDetail";
import postDupCheckNick from "../../util/postDupCheckNick";
if (typeof window !== "undefined") {
  injectStyle();
}
function GoogleSignUp() {
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
  });
  const [imgPreview, setImgPreview] = useState("");
  const [files, setFiles] = useState([]);
  const [form, setForm] = useState({
    username: getCookie("Google"),
    password: "",
    passwordAgain: "",
    nickName: "",
    stack: [],
  });
  const [dupCheck, setDupCheck] = useState({
    username: true,
    nickName: false,
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
    // 이 함수 util이나 hook으로 만들어서 쓸까? -> 고민해볼것.
    if (
      formReg.username &&
      formReg.nickName &&
      dupCheck.nickName &&
      dupCheck.username &&
      form.stack.length
    ) {
      try {
        const formdata = new FormData();
        //이부분 리팩토링 필요.
        if (imgPreview.length) {
          formdata.append("file", files);
        }
        formdata.append("username", form.username);
        formdata.append("nickName", form.nickName);
        formdata.append("stack", form.stack);
        const googleResponse = await postSocialSignUpAndDetail(
          formdata,
          "/googleSignup"
        );
        if (googleResponse.data.code === 1) {
          const { accessToken, refreshToken } = googleResponse.data.data;
          const decoded = jwt_decode(accessToken);
          dispatch(setUser(decoded));
          const getUser = await getUserInfo(decoded, accessToken);
          dispatch(setUserInfo(getUser.data));
          navigate("/");
          toast.success("구글 회원가입 완료~");
          deleteCookie("Google");
          setCookie("jwtToken", accessToken, {
            path: "/",
            domain: "chi-pos.com",
          });
          setCookie("refreshToken", refreshToken, {
            path: "/",
            domain: "chi-pos.com",
          });
        } else {
          if (googleResponse.data.code === -1) {
            toast.error("구글 회원가입 실패 ");
          }
        }
      } catch (err) {
        throw new Error(err);
      }
    } else {
      toast.error("회원 정보를 확인해주세요 !");
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
            setDupCheck((prev) => {
              return { ...prev, nickName: true };
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
              disabled={dupCheck.nickName}
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
                  <ImgPreview src={imgPreview} alt="preview-img" />
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

export default GoogleSignUp;
