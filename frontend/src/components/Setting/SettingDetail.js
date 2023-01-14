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
  SettingImgBtnBoxSpan,
  SettingImgBtnBoxInput,
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
import { setUserInfo, setUser } from "../../slice/userSlice";
import { deleteCookie, setCookie } from "../../util/cookie";
function SettingDetail() {
  const { userInfo } = useSelector((state) => {
    return state.user;
  });
  const { googleId, kakaoId } = userInfo.data;
  const notSocial = !kakaoId && !googleId;
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
      return {
        ...prev,
        newPassword: reg_password.test(e.target.value),
        newPasswordAgain: e.target.value === prev.newPasswordAgain,
      };
    };
    setFormReg(newPasswordReg);
  };
  const handleNewPasswordAgain = (e) => {
    setNewPasswordAgain(e.target.value);
    const newPasswordAgainReg = (prev) => {
      return { ...prev, newPasswordAgain: e.target.value === newPassword };
    };
    setFormReg(newPasswordAgainReg);
  };

  const onChangeNickName = (e) => {
    setNick(e.target.value);
  };
  const optionStack = stacks
    .map((stack) => stack.name)
    .map((a) => {
      return {
        value: a,
        label: a,
      };
    });
  const onSelectedStack = (value) => {
    console.log("valie : ", value);
    setStack(value);
  };
  // console.log("stack : ", stack);
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
  // console.log("files : ", files);
  // console.log(userInfo.data.imageUrl === files);
  console.log(formReg.newPassword, "new");
  console.log(formReg.newPasswordAgain, "new again");
  const handleDeleteImg = () => {
    if (imgPreview.length) {
      setImgPreview("");
    } else {
      if (window.confirm("기본 이미지로 변경하시겠습니까?")) {
        // 여기에 필요한 logic : setImgPreview에 기본 사진을 넣는 로직
        // 그리고 setImgPreview에 기본 사진이 들어가있다면 onSubmit에 files를 바꿔야됨
        // 기본 사진 넣고 alert으로 바뀌었단걸 알려줘야됨.
        console.log("기본 이미지로 변경");
      }
    }
  };
  const onSubmit = async () => {
    if (
      (!formReg.newPassword && !formReg.newPasswordAgain) ||
      (formReg.newPassword && formReg.newPasswordAgain)
    ) {
      try {
        const arrArr = stacks.map((a) => {
          return { number: a.number, name: a.name };
        });
        const beforeStack = [...new Set([...stack])].map((a) => a.value);
        const afterNumberStack = beforeStack
          .flatMap((a) => arrArr.filter((b) => b.name === a))
          .map((a) => a.number);
        console.log("afterNumberStack : ", afterNumberStack);
        const formdata = new FormData();
        if (
          notSocial &&
          files !== "nonUrl" &&
          userInfo.data.imageUrl !== files
        ) {
          console.log("file : ", files);
          formdata.append("file", files);
          console.log("파일 들어감");
        }
        formdata.append("nickName", nick);
        formdata.append("password", newPassword);
        formdata.append("stack", afterNumberStack);
        formdata.append("prePassword", notSocial ? prePassword : null);
        const res = await axios({
          method: "POST",
          url: API_URL + "/changeInfo",
          mode: "cors",
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `${getCookie("jwtToken")}`,
          },
          data: formdata,
        });
        console.log("res : ", res);
        if (res.data.code === 1) {
          dispatch(setUserInfo(res.data));
          alert("정보가 변경되었습니다.");
          navigate("/");
        } else if (res.data.code === -1) {
          alert(res.data.message);
        } else if (res.data.code === 2) {
          const nextRes = await axios({
            method: "POST",
            url: API_URL + "/changeInfo",
            mode: "cors",
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `${getCookie("refreshToken")}`,
            },
            data: formdata,
          });
          if (nextRes.data.code === 2 || nextRes.data.code === -1) {
            deleteCookie(["jwtToken"]);
            deleteCookie(["refreshToken"]);
            dispatch(setUserInfo([]));
            dispatch(setUser([]));
            alert("잘못된 접근입니다.");
            window.location.reload();
            navigate("/");
          } else if (nextRes.data.code !== -1) {
            deleteCookie("jwtToken");
            setCookie("jwtToken", nextRes.data.data);
            dispatch(setUserInfo(res.data));
            alert("정보가 변경되었습니다.");
            navigate("/");
          }
        }
      } catch (e) {
        throw new Error(e);
      }
    } else {
      alert("비밀번호 창을 비워주세요? 아니면 뭐 확인해주세요? ");
    }
  };
  return (
    <>
      <MainHead />
      <SettingContainer>
        <h1>내 정보 수정</h1>
        <SettingImgBox>
          <SettingImg
            alt="profile"
            src={
              !imgPreview.length
                ? userInfo.data.imageUrl !== "nonUrl"
                  ? userInfo.data.imageUrl
                  : "/c-pos/ms-icon-310x310.png"
                : imgPreview
            }
          />
          <SettingImgBtnBox>
            <SettingImgBtnBoxLabel>
              <SettingImgBtnBoxSpan>이미지 선택</SettingImgBtnBoxSpan>
              <SettingImgBtnBoxInput
                placeholder="이미지 선택"
                onChange={(e) => {
                  encodeFileToBase64(e.target.files[0]);
                }}
                type="file"
                accept="img/*"
              />
            </SettingImgBtnBoxLabel>
            <SettingImgBtnBoxBtn onClick={handleDeleteImg}>
              이미지 제거
            </SettingImgBtnBoxBtn>
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
        {notSocial && (
          <>
            <SettingTitleBox>
              <h3 style={{ width: "20rem" }}>기존 비밀번호</h3>
              <SettingTitleBoxInput
                placeholder="기존 비밀번호를 입력해 주세요."
                value={prePassword}
                onChange={handlePrePassword}
                type="password"
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
                type="password"
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
                type="password"
              />
            </SettingTitleBox>
            <SettingDescription>
              비밀번호를 변경하려면 변경할 비밀번호를 다시 입력해 주세요.
            </SettingDescription>
            <hr />
          </>
        )}
        <SettingCompleteBtn onClick={onSubmit}>완료</SettingCompleteBtn>
        <SettingWithdrawalBtn onClick={() => withdrawal(dispatch, navigate)}>
          회원탈퇴
        </SettingWithdrawalBtn>
      </SettingContainer>
    </>
  );
}

export default SettingDetail;
