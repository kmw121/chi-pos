import MainHead from "./MainHead";
import MainBanner from "./MainBanner";
import MainSection from "./MainSection";
import MainContents from "./MainContents";
import MainFooter from "./MainFooter";
import { BsFillArrowUpCircleFill } from "react-icons/bs";
function MainPage() {
  const handleTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <>
      <MainHead />
      <MainBanner />
      <MainSection />
      <MainContents />
      <MainFooter />
      <BsFillArrowUpCircleFill
        style={{
          width: "50px",
          height: "50px",
          position: "fixed",
          bottom: "10px",
          right: "10px",
          cursor: "pointer",
        }}
        onClick={handleTop}
      />
    </>
  );
}

export default MainPage;
