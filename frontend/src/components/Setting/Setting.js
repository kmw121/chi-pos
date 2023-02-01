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
  SettingWarningMessage,
} from "./settingComponents";
import { stackArrayWithNumber, stackSelectOption } from "../../util/stack";
import Select from "react-select";
import { useEffect, useState } from "react";
import MainHead from "../Main/MainHead";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import withdrawal from "../../util/withdrawal";
import { getCookie } from "../../util/cookie";
import { toast } from "react-toastify";
import postSignUpAndSettingChange from "../../util/postSignUpAndSettingChange";

const reg_password = /^[\w\Wㄱ-ㅎㅏ-ㅣ가-힣]{5,15}$/;

function Setting() {
  const { user, loading } = useSelector((state) => {
    return state.user;
  });
  console.log(loading);
  const { googleId, kakaoId } = user.data;
  const notSocial = !kakaoId && !googleId;
  const [stack, setStack] = useState(
    user &&
      user.data.userStack
        .map((a) => a.stack.name)
        .map((a) => {
          return { label: a, value: a };
        })
  );
  const [form, setForm] = useState({
    nick: "",
    prePassword: "",
    newPassword: "",
    newPasswordAgain: "",
    imgPreview: "",
    files: user.data.imageUrl,
    basicImg: false,
  });
  const [formReg, setFormReg] = useState({
    prePassword: false,
    newPassword: false,
    newPasswordAgain: false,
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };
  const onSelectedStack = (value) => {
    setStack(value);
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
  const handlBasicImg = () => {
    setForm({ ...form, basicImg: true });
    toast.success("기본 이미지로 변경되었습니다.");
  };
  const onSubmit = async () => {
    if (
      (!formReg.newPassword && !formReg.newPasswordAgain) ||
      (formReg.newPassword && formReg.newPasswordAgain)
    ) {
      try {
        const arrArr = stackArrayWithNumber.map((a) => {
          return { number: a.number, name: a.value };
        });
        const beforeStack = [...new Set([...stack])].map((a) => a.value);
        const afterNumberStack = beforeStack
          .flatMap((a) => arrArr.filter((b) => b.name === a))
          .map((a) => a.number);
        const formdata = new FormData();
        if (
          !form.basicImg &&
          form.imgPreview &&
          user.data.imageUrl !== form.files
        ) {
          formdata.append("file", form.files);
        }
        formdata.append("nickName", form.nick);
        formdata.append("basicImage", form.basicImg);
        formdata.append("password", form.newPassword);
        formdata.append("stack", afterNumberStack);
        formdata.append("prePassword", notSocial ? form.prePassword : null);
        await postSignUpAndSettingChange(
          formdata,
          "/changeInfo",
          getCookie("jwtToken"),
          dispatch,
          navigate
        );
      } catch {
        toast.error("알 수 없는 오류로 정보 변경에 실패하였습니다.");
      }
    } else {
      toast.error("정보를 정확히 입력해 주세요.");
    }
  };
  useEffect(() => {
    if (form.newPassword.length) {
      setFormReg((prev) => {
        return { ...prev, newPassword: reg_password.test(form.newPassword) };
      });
    }
    if (form.newPasswordAgain.length) {
      setFormReg((prev) => {
        return {
          ...prev,
          newPasswordAgain: form.newPassword === form.newPasswordAgain,
        };
      });
    }
  }, [form.newPassword, form.newPasswordAgain]);
  useEffect(() => {
    if (user && user.data.nickName) {
      setForm({ ...form, nick: user.data.nickName });
    }
  }, []);
  return (
    <>
      <MainHead />
      <SettingContainer>
        <h1>내 정보 수정</h1>
        <SettingImgBox>
          <SettingImg
            alt="profile"
            src={
              form.basicImg
                ? "/c-pos/ms-icon-310x310.png"
                : !form.imgPreview.length
                ? user.data.imageUrl !== "nonUrl"
                  ? user.data.imageUrl
                  : "/c-pos/ms-icon-310x310.png"
                : form.imgPreview
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
            <SettingImgBtnBoxBtn onClick={handlBasicImg}>
              기본 이미지
            </SettingImgBtnBoxBtn>
          </SettingImgBtnBox>
        </SettingImgBox>
        <SettingTitleBox>
          <h3 className="settingMainText">닉네임</h3>
          <SettingTitleBoxInput
            placeholder=""
            value={form.nick}
            onChange={handleChange}
            name="nick"
          />
        </SettingTitleBox>
        <SettingDescription>
          '프로젝트 이름'에서 사용되는 닉네임입니다.
        </SettingDescription>
        <hr />
        <SettingStackBox>
          <h3 className="settingMainText">관심 기술 태그</h3>
          <div className="settingTagSelect">
            <Select
              onChange={onSelectedStack}
              isMulti
              placeholder="관심 태그 선택"
              options={stackSelectOption}
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
              <h3 className="settingMainText">기존 비밀번호</h3>
              <SettingTitleBoxInput
                placeholder="기존 비밀번호를 입력해 주세요."
                value={form.prePassword}
                onChange={handleChange}
                type="password"
                name="prePassword"
              />
            </SettingTitleBox>
            <SettingDescription>
              정보 변경을 위하여 기존 비밀번호를 입력해 주세요.&nbsp;
              <strong className="colorRed">(필수)</strong>
            </SettingDescription>
            <hr />
            <SettingTitleBox>
              <h3 className="settingMainText">변경할 비밀번호</h3>
              <SettingTitleBoxInput
                placeholder="변경할 비밀번호를 입력해 주세요."
                value={form.newPassword}
                onChange={handleChange}
                type="password"
                name="newPassword"
              />
            </SettingTitleBox>
            {form.newPassword && !formReg.newPassword && (
              <SettingWarningMessage>
                비밀번호는 5글자 이상 15글자 이하입니다.
              </SettingWarningMessage>
            )}

            <SettingDescription>
              비밀번호를 변경하려면 변경할 비밀번호를 입력해 주세요.
            </SettingDescription>
            <hr />
            <SettingTitleBox>
              <h3 className="settingMainText">비밀번호 재입력</h3>
              <SettingTitleBoxInput
                placeholder="비밀번호를 다시 입력해 주세요."
                value={form.newPasswordAgain}
                onChange={handleChange}
                type="password"
                name="newPasswordAgain"
              />
            </SettingTitleBox>
            {form.newPasswordAgain && !formReg.newPasswordAgain && (
              <SettingWarningMessage>
                비밀번호가 일치하지 않습니다.
              </SettingWarningMessage>
            )}

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

export default Setting;
