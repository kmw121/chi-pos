import { useNavigate } from "react-router-dom";
import {
  RegisterBottomSection,
  RegisterBottomCancelBtn,
  RegisterBottomOkBtn,
} from "../components";
function RegisterBottomBtn() {
  const navigate = useNavigate();
  const onGoToBack = () => {
    navigate(-1);
  };
  const onSubmit = () => {
    alert("아직 못만듬");
  };
  return (
    <RegisterBottomSection>
      <RegisterBottomCancelBtn onClick={onGoToBack}>
        취소
      </RegisterBottomCancelBtn>
      <RegisterBottomOkBtn onClick={onSubmit}>글 등록</RegisterBottomOkBtn>
    </RegisterBottomSection>
  );
}

export default RegisterBottomBtn;
