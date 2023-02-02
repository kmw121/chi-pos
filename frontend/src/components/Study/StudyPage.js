import MainHead from "../Main/MainHead";
import Study from "./Study";

function StudyPage({ modalOpen, toggleModal }) {
  return (
    <>
      <MainHead modalOpen={modalOpen} toggleModal={toggleModal} />
      <Study />
    </>
  );
}

export default StudyPage;
