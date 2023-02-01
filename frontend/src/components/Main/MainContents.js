import React, { useState, useEffect } from "react";
import FadeLoader from "react-spinners/FadeLoader";
import "../../App.css";
import {
  AiOutlineEye,
  AiOutlineMessage,
  AiOutlineCloud,
  AiOutlineEdit,
  AiOutlineInstagram,
  AiOutlineFullscreenExit,
} from "react-icons/ai";
import {
  MainContentsAppContainer,
  MainContentsMain,
  MainContentsCategoryContainer,
  MainContentsCategoryInnerContainer,
  MainContentsCategoryItem,
  MainContentsToggle,
  MainContentsToggleText,
  MainContentsToggleLabel,
  MainContentsAppStudyUl,
  MainContentsAppStudyA,
  MainContentsAppStudyLi,
  MainContentsAppSchedule,
  MainContentsAppStudyTitle,
  MainContentsAppStudyTag,
  MainContentsAppStudyTagLi,
  MainContentsAppStudyImgUl,
  MainContentsAppStudyImgLi,
  MainContentsAppStudyInfo,
  MainContentsAppStudyInfoUserBox,
  MainContentsAppStudyInfoUserName,
  MainContentsAppStudyInfoRightBox,
  MainContentsAppStudyInfoRightDetail,
  MainContentsToggleInput,
  MainContentsAppStudyEmptyBox,
  MainContentsAppStudyEmtpyBoxInner,
  MainContentsAppStudyStackImg,
  MainContentsAppStudyInfoUserImg,
  MainLoadingBox,
} from "./mainComponents";
import {
  StudyPendingCOntainer,
  StudyPendingImg,
} from "../Study/studyComponents";
import getGenerateRandomKey from "../../util/getGenerateRandomKey";
import { useSelector } from "react-redux";
import { useIntersect } from "../../hooks/useIntersect";
import { toast } from "react-toastify";
import getIncreaseView from "../../util/getIncreaseView";

function MainContents({
  setSearchConfig,
  list,
  loadingStatus,
  setList,
  isEnd,
}) {
  const { user, loading } = useSelector((state) => {
    return state.user;
  });
  console.log(loading);
  const [isChecked, setIsChecked] = useState(false);
  const [categorySelected, setCategorySelected] = useState([
    {
      text: "전체",
      isSelected: true,
      category: "",
    },
    {
      text: "스터디",
      isSelected: false,
      category: "스터디",
    },
    { text: "프로젝트", isSelected: false, category: "프로젝트" },
  ]);
  const onClickFilterCategory = (text) => {
    setList([]);
    setSearchConfig((prev) => {
      return { ...prev, categoryType: text, page: 1 };
    });
  };
  const onClickCategorySelected = (category) => {
    setCategorySelected(
      categorySelected.map((content) =>
        content.text === category
          ? { ...content, isSelected: true }
          : { ...content, isSelected: false }
      )
    );
  };
  const handleInputCheck = () => {
    setIsChecked(!isChecked);
  };
  const onIncreaseView = async (id) => {
    try {
      await getIncreaseView(id);
    } catch {
      console.log("오류로 인하여 조회수가 올라가지 않았습니다.");
    }
  };
  const handleIsEnd = () => {
    setList([]);
    setSearchConfig((prev) => {
      return { ...prev, page: 1, isEnd: isChecked };
    });
  };
  const handleOnlyFavorited = () => {
    if (!user.code || user.code !== 1) {
      toast.error("로그인 후 이용할 수 있는 기능입니다.");
      return;
    }
    if (user && user.code === 1) {
      const myFavoriteStack = user.data.userStack.map((a) => a.stack.id);
      setList([]);
      setSearchConfig((prev) => {
        return {
          ...prev,
          stack: myFavoriteStack,
          categoryType: "",
        };
      });
      return;
    }
  };
  const ref = useIntersect(async (entry, observer) => {
    observer.unobserve(entry.target);
    if (!isEnd && !loadingStatus) {
      setSearchConfig((prev) => {
        return { ...prev, page: prev.page + 1 };
      });
    }
  });
  return (
    <MainContentsMain>
      <MainContentsCategoryContainer>
        <MainContentsCategoryInnerContainer>
          {categorySelected.map((content) => (
            <MainContentsCategoryItem
              onClick={() => {
                onClickCategorySelected(content.text);
                onClickFilterCategory(content.category);
              }}
              key={content.text}
              isSelected={content.isSelected}
            >
              {content.text === "전체" ? (
                <AiOutlineCloud />
              ) : content.text === "스터디" ? (
                <AiOutlineEdit />
              ) : content.text === "프로젝트" ? (
                <AiOutlineInstagram />
              ) : null}
              {content.text}
            </MainContentsCategoryItem>
          ))}
        </MainContentsCategoryInnerContainer>
        <MainContentsToggle>
          <MainContentsCategoryItem
            className="mainCategoryText"
            onClick={handleOnlyFavorited}
          >
            <AiOutlineFullscreenExit />
            관심 기술만 보기
          </MainContentsCategoryItem>
          <MainContentsToggleText>모집 중만 보기</MainContentsToggleText>
          <MainContentsToggleInput
            onChange={handleInputCheck}
            onClick={handleIsEnd}
            checked={isChecked}
            id="checkbox"
            type="checkbox"
          />
          <MainContentsToggleLabel htmlFor="checkbox" />
        </MainContentsToggle>
      </MainContentsCategoryContainer>
      <MainContentsAppContainer>
        <MainContentsAppStudyUl>
          {/* ////////////////////////////////////////////////////////// */}
          {list &&
            list.map((content, index) => (
              <MainContentsAppStudyA
                key={content.id + index + getGenerateRandomKey()}
                href={`/study/${content.id}`}
                onClick={() => onIncreaseView(content.id)}
              >
                <MainContentsAppStudyLi>
                  <MainContentsAppSchedule>
                    <p>시작 예정일 |</p>
                    <p>
                      {content.startDate.slice(0, 10).replace(/-/gi, " . ")}
                    </p>
                  </MainContentsAppSchedule>
                  <MainContentsAppStudyTitle>
                    {content.title}
                  </MainContentsAppStudyTitle>

                  <MainContentsAppStudyTag>
                    <MainContentsAppStudyTagLi>
                      #{content.categoryType}
                    </MainContentsAppStudyTagLi>
                    <MainContentsAppStudyTagLi>
                      {content.howto !== null && `#${content.howto}`}
                    </MainContentsAppStudyTagLi>
                    <MainContentsAppStudyTagLi>
                      #{content.people}
                    </MainContentsAppStudyTagLi>
                    <MainContentsAppStudyTagLi>
                      #{content.duration}
                    </MainContentsAppStudyTagLi>
                  </MainContentsAppStudyTag>

                  <MainContentsAppStudyImgUl>
                    {content.postStack.map((stack) => (
                      <MainContentsAppStudyImgLi key={stack.stack.id}>
                        <MainContentsAppStudyStackImg
                          src={`./logo/${stack.stack.name}.png`}
                          alt={stack.stack.name}
                        />
                      </MainContentsAppStudyImgLi>
                    ))}
                  </MainContentsAppStudyImgUl>
                </MainContentsAppStudyLi>
                <MainContentsAppStudyInfo>
                  <MainContentsAppStudyInfoUserBox>
                    <MainContentsAppStudyInfoUserImg
                      src={
                        content.user.imageUrl === "nonUrl"
                          ? "/c-pos/ms-icon-310x310.png"
                          : content.user.imageUrl
                      }
                      alt="hello world"
                    />
                    <MainContentsAppStudyInfoUserName>
                      {content.user.nickName}
                    </MainContentsAppStudyInfoUserName>
                  </MainContentsAppStudyInfoUserBox>
                  <MainContentsAppStudyInfoRightBox>
                    <MainContentsAppStudyInfoRightDetail>
                      <AiOutlineEye className="mainContenIcon" />
                      <p>{content.view}</p>
                    </MainContentsAppStudyInfoRightDetail>
                    <MainContentsAppStudyInfoRightDetail>
                      <AiOutlineMessage className="mainContenIcon" />
                      <p>{content.comments.length}</p>
                    </MainContentsAppStudyInfoRightDetail>
                  </MainContentsAppStudyInfoRightBox>
                </MainContentsAppStudyInfo>
              </MainContentsAppStudyA>
            ))}
          {loadingStatus && (
            <>
              <StudyPendingCOntainer>
                <StudyPendingImg src="/c-pos/ms-icon-310x310.png" alt="logo" />
              </StudyPendingCOntainer>
              <MainContentsAppStudyEmptyBox>
                <MainContentsAppStudyEmtpyBoxInner></MainContentsAppStudyEmtpyBoxInner>
              </MainContentsAppStudyEmptyBox>
              <MainContentsAppStudyEmptyBox>
                <MainContentsAppStudyEmtpyBoxInner></MainContentsAppStudyEmtpyBoxInner>
              </MainContentsAppStudyEmptyBox>
              <MainContentsAppStudyEmptyBox>
                <MainContentsAppStudyEmtpyBoxInner></MainContentsAppStudyEmtpyBoxInner>
              </MainContentsAppStudyEmptyBox>
            </>
          )}
        </MainContentsAppStudyUl>
        {loadingStatus && (
          <MainLoadingBox>
            <FadeLoader
              color="#aaa"
              height={15}
              width={5}
              radius={2}
              margin={2}
            />
          </MainLoadingBox>
        )}
      </MainContentsAppContainer>
      <div ref={ref} style={{ height: "1px" }} />
    </MainContentsMain>
  );
}

export default MainContents;
