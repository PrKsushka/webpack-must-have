import React from "react";
import Modal from "@/components/modal/modal";
import styles from "./successShppingModal.module.scss";

const SuccessShoppingModal: React.FunctionComponent = function () {
  return (
    <Modal>
      <div className={styles.title}>Great! Thank you for shopping!</div>
    </Modal>
  );
};
export default SuccessShoppingModal;
