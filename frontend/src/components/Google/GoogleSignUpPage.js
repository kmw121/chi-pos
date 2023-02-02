import MainHead from "../Main/MainHead";
import GoogleSignUp from "./GoogleSignUp";

function GoogleSignUpPage({ modalOpen, toggleModal }) {
  return (
    <>
      <MainHead modalOpen={modalOpen} toggleModal={toggleModal} />
      <GoogleSignUp />
    </>
  );
}

export default GoogleSignUpPage;
