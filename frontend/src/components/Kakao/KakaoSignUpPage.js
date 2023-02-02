import MainHead from "../Main/MainHead";
import KakaoSignUp from "./KakaoSignUp";

function KakaoSignUpPage({ toggleModal, modalOpen }) {
  return (
    <>
      <MainHead toggleModal={toggleModal} modalOpen={modalOpen} />
      <KakaoSignUp />
    </>
  );
}
export default KakaoSignUpPage;
