import React, { useState } from "react";
import FadeLoader from "react-spinners/FadeLoader";
import {
  AiOutlineEye,
  AiOutlineMessage,
  AiOutlineCloud,
  AiOutlineEdit,
  AiOutlineInstagram,
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
} from "../components";
import usePostsSearch from "../../hooks/usePostsSearch";
import { API_URL } from "../../util/API_URL";
import axios from "axios";
function MainContents({ searchConfig, setSearchConfig }) {
  const { list, loadingStatus } = usePostsSearch(searchConfig);
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
    const changeFilterCategory = (prev) => {
      return { ...prev, categoryType: text };
    };
    setSearchConfig(changeFilterCategory);
  };
  const onClickCategorySelected = (category) => {
    const changeList = categorySelected.map((content) =>
      content.category === category
        ? { ...content, isSelected: true }
        : { ...content, isSelected: false }
    );
    setCategorySelected(changeList);
  };
  const handleInputCheck = () => {
    setIsChecked(!isChecked);
  };
  const onClickView = async (id) => {
    try {
      await axios.get(API_URL + `/post/view/${id}`);
    } catch (err) {
      throw new Error(err);
    }
  };
  const handleIsEnd = () => {
    // isEnd 필터
    if (isChecked) {
      const isEndFilter = (prev) => {
        return { ...prev, isEnd: true };
      };
      setSearchConfig(isEndFilter);
    } else if (!isChecked) {
      // filter X
      const isEndFilter = (prev) => {
        return { ...prev, isEnd: false };
      };
      setSearchConfig(isEndFilter);
    }
  };
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
          {/* ///////////////////////////////// */}
          {list &&
            list.map((content) => (
              <MainContentsAppStudyA
                key={content.id}
                href={`/study/${content.id}`}
                onClick={() => onClickView(content.id)}
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
                      #{content.category}
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
                        <img
                          style={{
                            width: "48px",
                            height: "48px",
                            // borderRadius: "30px",
                          }}
                          src={`./logo/${stack.stack.name}.png`}
                          alt={stack.stack.name}
                        />
                      </MainContentsAppStudyImgLi>
                    ))}
                  </MainContentsAppStudyImgUl>
                </MainContentsAppStudyLi>
                <MainContentsAppStudyInfo>
                  <MainContentsAppStudyInfoUserBox>
                    <img
                      src={"favicon.ico"}
                      alt="hello world"
                      style={{
                        width: "28px",
                        height: "28px",
                        borderRadius: "30px",
                        marginRight: "10px",
                      }}
                    />
                    <MainContentsAppStudyInfoUserName>
                      {content.user.nickName}
                    </MainContentsAppStudyInfoUserName>
                  </MainContentsAppStudyInfoUserBox>
                  <MainContentsAppStudyInfoRightBox>
                    <MainContentsAppStudyInfoRightDetail>
                      <AiOutlineEye style={{ width: "28px", height: "28px" }} />
                      <p>{content.view}</p>
                    </MainContentsAppStudyInfoRightDetail>
                    <MainContentsAppStudyInfoRightDetail>
                      <AiOutlineMessage
                        style={{ width: "28px", height: "28px" }}
                      />
                      <p>{content.comments.length}</p>
                    </MainContentsAppStudyInfoRightDetail>
                  </MainContentsAppStudyInfoRightBox>
                </MainContentsAppStudyInfo>
              </MainContentsAppStudyA>
            ))}
        </MainContentsAppStudyUl>
        {loadingStatus && (
          <div
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <FadeLoader
              color="#aaa"
              height={15}
              width={5}
              radius={2}
              margin={2}
            />
          </div>
        )}
      </MainContentsAppContainer>
    </MainContentsMain>
  );
}

export default MainContents;
