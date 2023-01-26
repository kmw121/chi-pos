import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCurrentPost } from "../../slice/userSlice";
import {
  RegisterBottomSection,
  RegisterBottomCancelBtn,
  RegisterBottomOkBtn,
} from "../components";

function RegisterBottomBtn({ onSubmit }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onGoToBack = () => {
    if (window.confirm("글 등록을 취소하시겟습니까?")) {
      dispatch(setCurrentPost({}));
      navigate("/");
    }
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
