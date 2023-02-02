import SignUpForm from "./SignUpForm";
import MainHead from "../Main/MainHead";

function SignUpPage({ toggleModal, modalOpen }) {
  return (
    <>
      <MainHead modalOpen={modalOpen} toggleModal={toggleModal} />
      <SignUpForm modalOpen={modalOpen} toggleModal={toggleModal} />
    </>
  );
}

export default SignUpPage;
