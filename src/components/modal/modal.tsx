import React, { ReactElement, useEffect } from "react";
import ReactDom from "react-dom";
import { useDispatch } from "react-redux";
import modal from "./modal.module.scss";
import { setModalInActive } from "@/store/modules/auth/auth.actions";
import { Dispatcher } from "@/types/types";
import toggleBodyOverflow from "@/utils/overflow";


interface Modal {
  isActive: boolean;
  el?: Dispatcher<boolean>;
  children: ReactElement;
}

const Modal: React.FunctionComponent<Modal> = function ({ isActive, el, children }) {
  const dispatch = useDispatch();
  const closeModal = () => {
    dispatch(setModalInActive());
    toggleBodyOverflow();
    if(el) {el(false)}
  };
  useEffect(() => {
    if(isActive){
      toggleBodyOverflow(false);
    }
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
