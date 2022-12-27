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
} from "../components";
import { stacks } from "../../stack";
import Select from "react-select";
import { useState } from "react";
import MainHead from "../Main/MainHead";
import { useSelector } from "react-redux";
import { API_URL } from "../../API_URL";
function SettingDetail() {
  const [stack, setStack] = useState({});
  const stackArray = stacks
    .map((stack) => stack.name)
    .map((a) => {
      return {
        value: a,
        label: a,
      };
    });
  const optionStack = stackArray;
  const onSelectedStack = (value) => {
    setStack((prev) => {
      return { ...prev, value };
    });
  };
  const { userInfo } = useSelector((state) => {
    return state.user;
  });
  console.log(userInfo.data.id);
  return (
    <>
      <MainHead />
      <SettingContainer>
        <h1>내 정보 수정</h1>
        <SettingImgBox>
          <SettingImg
            src={API_URL + userInfo.data.imageUrl}
            alt="asdfasdfasdfasdfasdf"
          />
          <SettingImgBtnBox>
            <SettingImgBtnBoxLabel>이미지 선택</SettingImgBtnBoxLabel>
            <SettingImgBtnBoxBtn>이미지 제거</SettingImgBtnBoxBtn>
          </SettingImgBtnBox>
        </SettingImgBox>
        <SettingTitleBox>
          <h3 style={{ width: "20rem" }}>닉네임</h3>
          <SettingTitleBoxInput placeholder="" />
        </SettingTitleBox>
        <SettingDescription>
          '프로젝트 이름'에서 사용되는 닉네임입니다.
        </SettingDescription>
        <hr />
        <SettingStackBox>
          <h3 style={{ width: "20rem" }}>관심 기술 태그</h3>
          <Select
            onChange={onSelectedStack}
            isMulti
            placeholder="관심 태그 선택"
            options={optionStack}
            width="100"
          />
        </SettingStackBox>
        <SettingDescription>
          관심 있는 기술 태그를 등록해주세요.
        </SettingDescription>
        <hr />
        <SettingCompleteBtn>완료</SettingCompleteBtn>
        <SettingWithdrawalBtn>회원탈퇴</SettingWithdrawalBtn>
      </SettingContainer>
    </>
  );
}

export default SettingDetail;
