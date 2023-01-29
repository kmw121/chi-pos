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
} from "./settingComponents";
import { stacks } from "../../util/stack";
import Select from "react-select";
import { useEffect, useState } from "react";
import MainHead from "../Main/MainHead";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import withdrawal from "../../util/withdrawal";
import { getCookie } from "../../util/cookie";
import { fetchUser } from "../../slice/userSlice";
import { setCookie } from "../../util/cookie";
import { toast } from "react-toastify";
import postSocialSignUpAndDetail from "../../util/postSocialSignUpAndDetail";
import wrongRequest from "../../util/wrongRequest";

function Setting() {
  const { user } = useSelector((state) => {
    return state.user;
  });
  const { googleId, kakaoId } = user.data;
  const notSocial = !kakaoId && !googleId;
  const reg_password = /^[\w\Wㄱ-ㅎㅏ-ㅣ가-힣]{5,15}$/;
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
  const optionStack = stacks
    .map((stack) => stack.name)
    .map((a) => {
      return {
        value: a,
        label: a,
      };
    });
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
  const handleDeleteImg = () => {
    if (window.confirm("기본 이미지로 변경하시겠습니까?")) {
      setForm({ ...form, basicImg: true });
      toast.success("기본 이미지로 변경되었습니다.");
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
        const formdata = new FormData();
        //현재 확인된 오류?아니면...무언가 : form.files를 append 안 하고 제출했는데
        //이미지가 기본 이미지(nonUrl)로 안바뀜 ㅜㅜ
        if (
          !form.basicImg &&
          form.imgPreview &&
          user.data.imageUrl !== form.files
        ) {
          formdata.append("file", form.files);
        }
        formdata.append("nickName", form.nick);
        formdata.append("password", form.newPassword);
        formdata.append("stack", afterNumberStack);
        formdata.append("prePassword", notSocial ? form.prePassword : null);
        const changeInfoResponse = await postSocialSignUpAndDetail(
          formdata,
          "/changeInfo",
          getCookie("jwtToken")
        );
        if (changeInfoResponse.data.code === 1) {
          dispatch(fetchUser(changeInfoResponse.data.data));
          navigate("/");
          toast.success("정보가 변경되었습니다.");
        } else if (changeInfoResponse.data.code === -1) {
          toast.error(changeInfoResponse.data.message);
        } else if (changeInfoResponse.data.code === 2) {
          const changeNextResponse = await postSocialSignUpAndDetail(
            formdata,
            "/changeInfo",
            getCookie("refreshToken")
          );
          if (
            changeNextResponse.data.code === 2 ||
            changeNextResponse.data.code === -1
          ) {
            wrongRequest(dispatch, navigate);
          } else if (changeNextResponse.data.code === 1) {
            setCookie("jwtToken", changeNextResponse.data.data);
            const response = await postSocialSignUpAndDetail(
              formdata,
              "/changeInfo",
              changeNextResponse.data.data
            );
            if (response.data.code === 1) {
              dispatch(fetchUser(response.data.data));
              navigate("/");
              toast.success("정보가 변경되었습니다.");
            } else {
              throw new Error();
            }
          }
        }
      } catch (e) {
        throw new Error(e);
      }
    } else {
      toast.error("비밀번호 창을 비워주세요? 아니면 뭐 확인해주세요? ");
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
    if (user && user.data.nickName !== undefined) {
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
            <SettingImgBtnBoxBtn onClick={handleDeleteImg}>
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
