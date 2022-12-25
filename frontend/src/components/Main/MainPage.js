import MainHead from "./MainHead";
import MainBanner from "./MainBanner";
import MainSection from "./MainSection";
import MainContents from "./MainContents";
import MainFooter from "./MainFooter";
import { BsFillArrowUpCircleFill } from "react-icons/bs";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
function MainPage({ login, setLogin }) {
  const handleTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  useEffect(() => {
    console.log("main mount");
  }, []);
  // const [cookies, setCookie] = useCookies(["id"]);
  // console.log("cookies : ", cookies);
  return (
    <>
      <MainHead login={login} setLogin={setLogin} />
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
