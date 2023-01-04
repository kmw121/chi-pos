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
  const [pageNum, setPageNum] = useState(1);
  const [searchConfig, setSearchConfig] = useState({
    stack: [],
    size: 6,
    page: pageNum,
    isEnd: true,
    categoryType: "",
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
        pageNum={pageNum}
        setPageNum={setPageNum}
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
