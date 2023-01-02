import React from "react";
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
} from "../components";
import usePostsSearch from "../../hooks/usePostsSearch";
import { API_URL } from "../../util/API_URL";
import axios from "axios";
function MainContents() {
  const { list, loadingStatus } = usePostsSearch();
  usePostsSearch();
  const onClickView = async (id) => {
    try {
      await axios.get(API_URL + `/post/view/${id}`);
    } catch (err) {
      throw new Error(err);
    }
  };
  console.log(list);
  return (
    <MainContentsMain>
      <MainContentsCategoryContainer>
        <MainContentsCategoryInnerContainer>
          <MainContentsCategoryItem>
            <AiOutlineCloud />
            전체
          </MainContentsCategoryItem>
          <MainContentsCategoryItem>
            <AiOutlineEdit />
            스터디
          </MainContentsCategoryItem>
          <MainContentsCategoryItem>
            <AiOutlineInstagram />
            프로젝트
          </MainContentsCategoryItem>
        </MainContentsCategoryInnerContainer>
        <MainContentsToggle>
          <MainContentsToggleText>모집 중만 보기</MainContentsToggleText>
          <MainContentsToggleLabel />
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
            쫌만 기둘...
          </div>
        )}
      </MainContentsAppContainer>
    </MainContentsMain>
  );
}

export default MainContents;
