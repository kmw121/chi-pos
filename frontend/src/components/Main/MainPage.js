import MainHead from "./MainHead";
import MainBanner from "./MainBanner";
import MainSection from "./MainSection";
import MainContents from "./MainContents";
import { BsFillArrowUpCircleFill } from "react-icons/bs";
import "../../App.css";
import usePostsSearch from "../../hooks/usePostsSearch";
function MainPage() {
  const handleTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const {
    list,
    loadingStatus,
    setList,
    searchConfig,
    setSearchConfig,
    isEnd,
  } = usePostsSearch();
  return (
    <>
      <MainHead />
      <MainBanner />
      <MainSection
        setSearchConfig={setSearchConfig}
        setList={setList}
        searchConfig={searchConfig}
      />
      <MainContents
        list={list}
        loadingStatus={loadingStatus}
        setList={setList}
        setSearchConfig={setSearchConfig}
        isEnd={isEnd}
      />
      <BsFillArrowUpCircleFill
        className="mainHandleTopIcon"
        onClick={handleTop}
      />
    </>
  );
}

export default MainPage;
