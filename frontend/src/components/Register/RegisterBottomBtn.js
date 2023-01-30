import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setEditingPost } from "../../slice/userSlice";
import {
  RegisterBottomSection,
  RegisterBottomCancelBtn,
  RegisterBottomOkBtn,
} from "./registerComponents";

function RegisterBottomBtn({ onSubmit }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onGoToBack = () => {
    dispatch(setEditingPost({}));
    navigate("/");
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
