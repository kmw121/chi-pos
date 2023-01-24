import React, { useEffect } from "react";
import {
  AlertModalBox,
  AlertModalText,
  ModalBackground,
  AlertModalButton,
} from "../components";
import { useGetPreventScrolling } from "../../hooks/useGetPreventScrolling";
import { useNavigate } from "react-router-dom";
function AlertModal({ onToggle, text }) {
  useGetPreventScrolling();
  const navigate = useNavigate();
  const onClickOkay = () => {
    onToggle();
    // navigate("/");
  };
  return (
    <>
      <ModalBackground onClick={onToggle} />
      <AlertModalBox onClick={(e) => e.stopPropagation()}>
        <AlertModalText>{text} </AlertModalText>
        <AlertModalButton onClick={onClickOkay}>확인</AlertModalButton>
      </AlertModalBox>
    </>
  );
}

export default AlertModal;
