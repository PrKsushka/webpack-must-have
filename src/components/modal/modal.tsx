import React, { ReactElement, useEffect } from "react";
import ReactDom from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import modal from "./modal.module.scss";
import { setModalInActive } from "@/store/modules/auth/auth.actions";
import { RootState } from "@/main";
import { StoreState } from "@/store/types";

interface Modal {
  children: ReactElement;
}

const Modal: React.FunctionComponent<Modal> = function ({ children }) {
  const dispatch = useDispatch();
  const { body } = document;
  const isActive = useSelector<RootState, boolean>((state: StoreState) => state.auth.modalActive);
  const closeModal = () => {
    dispatch(setModalInActive());
    body.style.overflow = "auto";
  };
  useEffect(() => {
    (isActive) ? body.style.overflow = "hidden":body.style.overflow = "auto";
  }, [isActive]);
  return ReactDom.createPortal(
    <div className={isActive ? modal.active : modal.modal}>
      <div className={modal.iconClose} onClick={closeModal} />
      <div className={isActive ? modal.modalContent : modal.content}>{children}</div>
    </div>,
    document.getElementById("portal") as HTMLElement
  );
};
export default Modal;
