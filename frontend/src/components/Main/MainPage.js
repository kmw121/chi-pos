import MainHead from "./MainHead";
import MainBanner from "./MainBanner";
import MainSection from "./MainSection";
import MainContents from "./MainContents";
import MainFooter from "./MainFooter";
import { BsFillArrowUpCircleFill } from "react-icons/bs";
import { useState } from "react";
import usePostsSearch from "../../hooks/usePostsSearch";
function MainPage({ login, setLogin }) {
  const handleTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const [hello, setHello] = useState(true);

  const {
    list,
    loadingStatus,
    setLoadingStatus,
    setList,
    searchConfig,
    setSearchConfig,
  } = usePostsSearch(hello);
  console.log("hello : ", hello);
  return (
    <>
      <MainHead login={login} setLogin={setLogin} />
      <MainBanner />
      <MainSection setSearchConfig={setSearchConfig} setList={setList} />
      <MainContents
        list={list}
        loadingStatus={loadingStatus}
        setLoadingStatus={setLoadingStatus}
        setList={setList}
        searchConfig={searchConfig}
        setSearchConfig={setSearchConfig}
        hello={hello}
        setHello={setHello}
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
