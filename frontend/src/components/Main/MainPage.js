import MainHead from "./MainHead";
import MainBanner from "./MainBanner";
import MainSection from "./MainSection";
import MainContents from "./MainContents";
import MainFooter from "./MainFooter";
import { BsFillArrowUpCircleFill } from "react-icons/bs";
import { useState } from "react";
function MainPage({ login, setLogin }) {
  const handleTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const [searchConfig, setSearchConfig] = useState({
    stack: [],
    size: 6,
    page: 1,
    isEnd: true,
    categoryType: "",
    // isEnd: true -> all return, false -> 모집중 return
    // categoryType : null || "" -> all return , '스터디' || '프로젝트' -> 그것에 맞는거 return
    // isEnd , categorType 은 백엔드 개발중
  });
  console.log("searchConfig : ", searchConfig);
  return (
    <>
      <MainHead login={login} setLogin={setLogin} />
      <MainBanner />
      <MainSection
        searchConfig={searchConfig}
        setSearchConfig={setSearchConfig}
      />
      <MainContents
        searchConfig={searchConfig}
        setSearchConfig={setSearchConfig}
      />
      <MainFooter />
      <BsFillArrowUpCircleFill
        style={{
          width: "50px",
          height: "50px",
          position: "fixed",
          bottom: "10px",
          right: "10px",
          cursor: "pointer",
          opacity: "0.5",
        }}
        onClick={handleTop}
      />
    </>
  );
}

export default MainPage;
