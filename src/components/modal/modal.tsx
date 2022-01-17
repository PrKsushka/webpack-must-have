import React, { ReactElement, useEffect } from "react";
import ReactDom from "react-dom";
import { useDispatch } from "react-redux";
import modal from "./modal.module.scss";
import { setModalInActive } from "@/store/modules/auth/auth.actions";
import { Dispatcher } from "@/types/types";

interface Modal {
  isActive: boolean;
  el?: Dispatcher<boolean>;
  children: ReactElement;
}

const Modal: React.FunctionComponent<Modal> = function ({ isActive, el, children }) {
  const dispatch = useDispatch();
  const { body } = document;
  const closeModal = () => {
    dispatch(setModalInActive());
    body.style.overflow = "auto";
    (el)? el(false) : null;
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
