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
} from "../components";
import axios from "axios";
import { stacks } from "../../util/stack";
import { API_URL } from "../../util/API_URL";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { getCookie, deleteCookie, setCookie } from "../../util/cookie";
import { useDispatch } from "react-redux";
import jwt_decode from "jwt-decode";
import { setUser } from "../../slice/userSlice";
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
  });
  const [imgPreview, setImgPreview] = useState("");
  const [files, setFiles] = useState([]);
  const [form, setForm] = useState({
    username: getCookie("Kakao"),
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
    alert("취소하셨습니다. 다시 시도해주세요.");
    navigate("/");
  };
  const dispatch = useDispatch();
  const onSelectedStack = (value) => {
    setForm((prev) => {
      return { ...prev, stack: value.map((a) => a.number) };
    });
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
      dupCheck.nickName &&
      dupCheck.username &&
      form.stack.length
    ) {
      try {
        const formdata = new FormData();
        //이부분 리팩토링 필요.
        formdata.append("file", files);
        formdata.append("username", form.username);
        formdata.append("nickName", form.nickName);
        formdata.append("stack", form.stack);

        const res = await axios({
          method: "POST",
          url: API_URL + "/kakaoSignup",
          mode: "cors",
          headers: { "Content-Type": "multipart/form-data" },
          data: formdata,
        });
        if (res.data.code === 1) {
          alert("카카오 회원가입 완료~");
          navigate("/");
          console.log(res);
          const jwtToken = res.data.data.accessToken;
          const refreshToken = res.data.data.refreshToken;
          const decoded = jwt_decode(jwtToken);
          dispatch(setUser(decoded));
          deleteCookie("jwtToken");
          deleteCookie("refreshToken");
          deleteCookie("Kakao");
          setCookie("jwtToken", jwtToken);
          setCookie("refreshToken", refreshToken);
        } else {
          if (res.data.code === -1) {
            alert("kakao 회원가입 실패 ");
            console.log(res);
          }
        }
      } catch (err) {
        throw new Error(err);
      }
    } else {
      alert("회원 정보를 확인해주세요 ! ");
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
  console.log("유효성 : ", formReg);
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

export default KakaoSignUp;
