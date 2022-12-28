import React from "react";
import styled from "styled-components";
import { CiInstagram, CiCloudOn, CiEdit } from "react-icons/ci";
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
} from "../components";
function MainContents() {
  // const total = <CiCloudOn />;
  // const study = <CiEdit />;
  // const pproject = <CiInstagram />;
  // const contentsCategoryItem = [
  //   { text: "전체", logo: total },
  //   { text: "스터디", logo: study },
  //   { text: "프로젝트", logo: pproject },
  // ];
  return (
    <MainContentsMain>
      <MainContentsCategoryContainer>
        <MainContentsCategoryInnerContainer>
          {/* 오류때문에 일단 주석처리 해놓음. */}
          {/* {contentsCategoryItem.map((content) => (
            <MainContentsCategoryItem key={content.text}>
              {content.logo}
              {content.text}
            </MainContentsCategoryItem>
          ))} */}
        </MainContentsCategoryInnerContainer>
        <MainContentsToggle>
          <MainContentsToggleText>모집 중만 보기</MainContentsToggleText>
          <MainContentsToggleLabel />
        </MainContentsToggle>
      </MainContentsCategoryContainer>

      <MainContentsAppContainer>
        <MainContentsAppStudyUl>
          <MainContentsAppStudyA>
            <MainContentsAppStudyLi>
              <MainContentsAppSchedule>
                <p>시작 예정일 |</p>
                <p>2022.12.10</p>
              </MainContentsAppSchedule>
              <MainContentsAppStudyTitle>
                일산에서 코딩(TypeScript) 스터디 멤버 구합니당~
              </MainContentsAppStudyTitle>

              <MainContentsAppStudyTag>
                <MainContentsAppStudyTagLi>#STUDY</MainContentsAppStudyTagLi>
                <MainContentsAppStudyTagLi>#ONLINE</MainContentsAppStudyTagLi>
                <MainContentsAppStudyTagLi>#1PERSON</MainContentsAppStudyTagLi>
                <MainContentsAppStudyTagLi>#2MONTH</MainContentsAppStudyTagLi>
              </MainContentsAppStudyTag>
              <MainContentsAppStudyImgUl>
                <MainContentsAppStudyImgLi>
                  <img src={"favicon.ico"} alt="hello world" />
                </MainContentsAppStudyImgLi>
                <MainContentsAppStudyImgLi>
                  <img src={"favicon.ico"} alt="hello world" />
                </MainContentsAppStudyImgLi>
                <MainContentsAppStudyImgLi>
                  <img src={"favicon.ico"} alt="hello world" />
                </MainContentsAppStudyImgLi>
              </MainContentsAppStudyImgUl>
            </MainContentsAppStudyLi>
          </MainContentsAppStudyA>
          <MainContentsAppStudyA>
            <MainContentsAppStudyLi>
              <MainContentsAppSchedule>
                <p>시작 예정일 |</p>
                <p>2022.12.10</p>
              </MainContentsAppSchedule>
              <MainContentsAppStudyTitle>
                일산에서 코딩(TypeScript) 스터디 멤버 구합니당~
              </MainContentsAppStudyTitle>

              <MainContentsAppStudyTag>
                <MainContentsAppStudyTagLi>#STUDY</MainContentsAppStudyTagLi>
                <MainContentsAppStudyTagLi>#ONLINE</MainContentsAppStudyTagLi>
                <MainContentsAppStudyTagLi>#1PERSON</MainContentsAppStudyTagLi>
                <MainContentsAppStudyTagLi>#2MONTH</MainContentsAppStudyTagLi>
              </MainContentsAppStudyTag>
              <MainContentsAppStudyImgUl>
                <MainContentsAppStudyImgLi>
                  <img src={"favicon.ico"} alt="hello world" />
                </MainContentsAppStudyImgLi>
                <MainContentsAppStudyImgLi>
                  <img src={"favicon.ico"} alt="hello world" />
                </MainContentsAppStudyImgLi>
                <MainContentsAppStudyImgLi>
                  <img src={"favicon.ico"} alt="hello world" />
                </MainContentsAppStudyImgLi>
              </MainContentsAppStudyImgUl>
            </MainContentsAppStudyLi>
          </MainContentsAppStudyA>
          <MainContentsAppStudyA>
            <MainContentsAppStudyLi>
              <MainContentsAppSchedule>
                <p>시작 예정일 |</p>
                <p>2022.12.10</p>
              </MainContentsAppSchedule>
              <MainContentsAppStudyTitle>
                일산에서 코딩(TypeScript) 스터디 멤버 구합니당~
              </MainContentsAppStudyTitle>

              <MainContentsAppStudyTag>
                <MainContentsAppStudyTagLi>#STUDY</MainContentsAppStudyTagLi>
                <MainContentsAppStudyTagLi>#ONLINE</MainContentsAppStudyTagLi>
                <MainContentsAppStudyTagLi>#1PERSON</MainContentsAppStudyTagLi>
                <MainContentsAppStudyTagLi>#2MONTH</MainContentsAppStudyTagLi>
              </MainContentsAppStudyTag>
              <MainContentsAppStudyImgUl>
                <MainContentsAppStudyImgLi>
                  <img src={"favicon.ico"} alt="hello world" />
                </MainContentsAppStudyImgLi>
                <MainContentsAppStudyImgLi>
                  <img src={"favicon.ico"} alt="hello world" />
                </MainContentsAppStudyImgLi>
                <MainContentsAppStudyImgLi>
                  <img src={"favicon.ico"} alt="hello world" />
                </MainContentsAppStudyImgLi>
              </MainContentsAppStudyImgUl>
            </MainContentsAppStudyLi>
          </MainContentsAppStudyA>
          <MainContentsAppStudyA>
            <MainContentsAppStudyLi>
              <MainContentsAppSchedule>
                <p>시작 예정일 |</p>
                <p>2022.12.10</p>
              </MainContentsAppSchedule>
              <MainContentsAppStudyTitle>
                일산에서 코딩(TypeScript) 스터디 멤버 구합니당~
              </MainContentsAppStudyTitle>

              <MainContentsAppStudyTag>
                <MainContentsAppStudyTagLi>#STUDY</MainContentsAppStudyTagLi>
                <MainContentsAppStudyTagLi>#ONLINE</MainContentsAppStudyTagLi>
                <MainContentsAppStudyTagLi>#1PERSON</MainContentsAppStudyTagLi>
                <MainContentsAppStudyTagLi>#2MONTH</MainContentsAppStudyTagLi>
              </MainContentsAppStudyTag>
              <MainContentsAppStudyImgUl>
                <MainContentsAppStudyImgLi>
                  <img src={"favicon.ico"} alt="hello world" />
                </MainContentsAppStudyImgLi>
                <MainContentsAppStudyImgLi>
                  <img src={"favicon.ico"} alt="hello world" />
                </MainContentsAppStudyImgLi>
                <MainContentsAppStudyImgLi>
                  <img src={"favicon.ico"} alt="hello world" />
                </MainContentsAppStudyImgLi>
              </MainContentsAppStudyImgUl>
            </MainContentsAppStudyLi>
          </MainContentsAppStudyA>
          <MainContentsAppStudyA>
            <MainContentsAppStudyLi>
              <MainContentsAppSchedule>
                <p>시작 예정일 |</p>
                <p>2022.12.10</p>
              </MainContentsAppSchedule>
              <MainContentsAppStudyTitle>
                일산에서 코딩(TypeScript) 스터디 멤버 구합니당~
              </MainContentsAppStudyTitle>

              <MainContentsAppStudyTag>
                <MainContentsAppStudyTagLi>#STUDY</MainContentsAppStudyTagLi>
                <MainContentsAppStudyTagLi>#ONLINE</MainContentsAppStudyTagLi>
                <MainContentsAppStudyTagLi>#1PERSON</MainContentsAppStudyTagLi>
                <MainContentsAppStudyTagLi>#2MONTH</MainContentsAppStudyTagLi>
              </MainContentsAppStudyTag>
              <MainContentsAppStudyImgUl>
                <MainContentsAppStudyImgLi>
                  <img src={"favicon.ico"} alt="hello world" />
                </MainContentsAppStudyImgLi>
                <MainContentsAppStudyImgLi>
                  <img src={"favicon.ico"} alt="hello world" />
                </MainContentsAppStudyImgLi>
                <MainContentsAppStudyImgLi>
                  <img src={"favicon.ico"} alt="hello world" />
                </MainContentsAppStudyImgLi>
              </MainContentsAppStudyImgUl>
            </MainContentsAppStudyLi>
          </MainContentsAppStudyA>
          <MainContentsAppStudyA>
            <MainContentsAppStudyLi>
              <MainContentsAppSchedule>
                <p>시작 예정일 |</p>
                <p>2022.12.10</p>
              </MainContentsAppSchedule>
              <MainContentsAppStudyTitle>
                일산에서 코딩(TypeScript) 스터디 멤버 구합니당~
              </MainContentsAppStudyTitle>

              <MainContentsAppStudyTag>
                <MainContentsAppStudyTagLi>#STUDY</MainContentsAppStudyTagLi>
                <MainContentsAppStudyTagLi>#ONLINE</MainContentsAppStudyTagLi>
                <MainContentsAppStudyTagLi>#1PERSON</MainContentsAppStudyTagLi>
                <MainContentsAppStudyTagLi>#2MONTH</MainContentsAppStudyTagLi>
              </MainContentsAppStudyTag>
              <MainContentsAppStudyImgUl>
                <MainContentsAppStudyImgLi>
                  <img src={"favicon.ico"} alt="hello world" />
                </MainContentsAppStudyImgLi>
                <MainContentsAppStudyImgLi>
                  <img src={"favicon.ico"} alt="hello world" />
                </MainContentsAppStudyImgLi>
                <MainContentsAppStudyImgLi>
                  <img src={"favicon.ico"} alt="hello world" />
                </MainContentsAppStudyImgLi>
              </MainContentsAppStudyImgUl>
            </MainContentsAppStudyLi>
          </MainContentsAppStudyA>
        </MainContentsAppStudyUl>
      </MainContentsAppContainer>
    </MainContentsMain>
  );
}

export default MainContents;
