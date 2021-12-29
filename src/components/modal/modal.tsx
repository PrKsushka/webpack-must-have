import React, { ReactElement } from "react";
import ReactDom from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import modal from "./modal.module.scss";
import { setModalInActive } from "@/store/authenticate/authActions";
import { RootState } from "@/main";

interface Modal {
  children: ReactElement;
}

const Modal: React.FunctionComponent<Modal> = function ({children }) {
  const dispatch = useDispatch();
  const body = document.getElementsByTagName("body")[0];
  const isActive = useSelector<RootState, boolean>((state) => state.auth.modalActive);
  (isActive)? body.style.overflow="hidden":body.style.overflow="visible";
  const closeModal = () => {
    dispatch(setModalInActive());
    body.style.overflow="visible"
  };

  return ReactDom.createPortal(
    <div className={isActive ? modal.active : modal.modal}>
      <div className={modal.iconClose} onClick={closeModal} />
      <div className={isActive ? modal.modalContent : modal.content}>{children}</div>
    </div>,
    document.getElementById("portal") as HTMLElement
  );
};
export default Modal;
