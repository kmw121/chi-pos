import { useNavigate } from "react-router-dom";
import {
  RegisterBottomSection,
  RegisterBottomCancelBtn,
  RegisterBottomOkBtn,
} from "../components";
function RegisterBottomBtn({ onSubmit }) {
  const navigate = useNavigate();
  const onGoToBack = () => {
    navigate(-1);
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
