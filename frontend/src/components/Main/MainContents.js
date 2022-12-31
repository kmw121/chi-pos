import React from "react";
import { CiInstagram, CiCloudOn, CiEdit } from "react-icons/ci";
import { AiOutlineEye, AiOutlineMessage } from "react-icons/ai";
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
import { useSelector } from "react-redux";
function MainContents() {
  const { posts } = useSelector((state) => {
    return state.user;
  });
  console.log("psts in contents component : ", posts);
  return (
    <MainContentsMain>
      <MainContentsCategoryContainer>
        <MainContentsCategoryInnerContainer>
          <MainContentsCategoryItem>
            {/* <CiCloudOn /> */}
            전체
          </MainContentsCategoryItem>
          <MainContentsCategoryItem>
            {/* <CiEdit /> */}
            스터디
          </MainContentsCategoryItem>
          <MainContentsCategoryItem>
            {/* <CiInstagram /> */}
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
          {posts.map((content) => (
            <MainContentsAppStudyA
              key={content.id + content.createDate}
              href={`/study/${content.id}`}
            >
              <MainContentsAppStudyLi>
                <MainContentsAppSchedule>
                  <p>시작 예정일 |</p>
                  <p>{content.startDate.slice(0, 10).replace(/-/gi, " . ")}</p>
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
                  <MainContentsAppStudyImgLi>
                    <img
                      style={{
                        width: "48px",
                        height: "48px",
                        borderRadius: "30px",
                      }}
                      src={"favicon.ico"}
                      alt="hello world"
                    />
                  </MainContentsAppStudyImgLi>
                  <MainContentsAppStudyImgLi>
                    <img
                      style={{
                        width: "48px",
                        height: "48px",
                        borderRadius: "30px",
                      }}
                      src={"favicon.ico"}
                      alt="hello world"
                    />
                  </MainContentsAppStudyImgLi>
                  <MainContentsAppStudyImgLi>
                    <img
                      style={{
                        width: "48px",
                        height: "48px",
                        borderRadius: "30px",
                      }}
                      src={"favicon.ico"}
                      alt="hello world"
                    />
                  </MainContentsAppStudyImgLi>
                </MainContentsAppStudyImgUl>
              </MainContentsAppStudyLi>
              <MainContentsAppStudyInfo>
                <MainContentsAppStudyInfoUserBox>
                  <img
                    src={"favicon.ico"}
                    alt="hello world"
                    style={{ width: "28px", height: "28px" }}
                  />
                  <MainContentsAppStudyInfoUserName>
                    {content.user.nickName}
                  </MainContentsAppStudyInfoUserName>
                </MainContentsAppStudyInfoUserBox>
                <MainContentsAppStudyInfoRightBox>
                  <MainContentsAppStudyInfoRightDetail>
                    <AiOutlineEye style={{ width: "28px", height: "28px" }} />
                    {/* 조회수 들어갈 자리 */}
                    <p>0</p>
                  </MainContentsAppStudyInfoRightDetail>
                  <MainContentsAppStudyInfoRightDetail>
                    <AiOutlineMessage
                      style={{ width: "28px", height: "28px" }}
                    />
                    {/* 댓글 갯수 들어갈 자리 */}
                    <p>0</p>
                  </MainContentsAppStudyInfoRightDetail>
                </MainContentsAppStudyInfoRightBox>
              </MainContentsAppStudyInfo>
            </MainContentsAppStudyA>
          ))}
        </MainContentsAppStudyUl>
      </MainContentsAppContainer>
    </MainContentsMain>
  );
}

export default MainContents;
