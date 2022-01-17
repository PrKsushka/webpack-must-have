import React from "react";
import Modal from "@/components/modal/modal";
import styles from "./successShppingModal.module.scss";
import { StoreState } from "@/store/types";
import { RootState } from "@/main";
import { useSelector } from "react-redux";

const SuccessShoppingModal: React.FunctionComponent = function () {
  const isActive = useSelector<RootState, boolean>((state: StoreState) => state.auth.modalActive);
  return (
    <Modal isActive={isActive}>
      <div className={styles.title}>Great! Thank you for shopping!</div>
    </Modal>
  );
};
export default SuccessShoppingModal;
