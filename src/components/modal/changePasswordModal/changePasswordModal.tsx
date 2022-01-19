import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { loginRegisterSchema } from "@/components/UI/input/schemas";
import { dataForm } from "@/types/productsCommon.types";
import { changePasswordAction } from "@/store/modules/auth/auth.actions";
import styles from "../modal.module.scss";
import Input from "@/components/UI/input/input";
import ErrorMessage from "@/components/errorMessage/errorMessage";
import Modal from "@/components/modal/modal";
import { RootState } from "@/main";
import { StoreState } from "@/store/types";
import toggleBodyOverflow from "@/utils/overflow";


const ChangePasswordModal: React.FunctionComponent = function () {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange", resolver: yupResolver(loginRegisterSchema) });
  const dispatch = useDispatch();

  const onSubmit = (data: dataForm) => {
    if (data) {
      dispatch(changePasswordAction(data));
      toggleBodyOverflow();
    }
    reset();
  };
  const isActive = useSelector<RootState, boolean>((state: StoreState) => state.auth.modalActive);
  return (
    <Modal isActive={isActive}>
      <form className={styles.formData} onSubmit={handleSubmit(onSubmit)}>
        <h3 className={styles.changePassword}>Change Password</h3>
        <Input
          name="password"
          type="password"
          text="Password"
          registerOptions={{
            required: true,
          }}
          register={register}
        />
        {errors.password ? <ErrorMessage>{errors.password.message}</ErrorMessage> : null}
        <br />
        <Input
          type="password"
          name="passwordDuplicate"
          text="Repeat your password"
          registerOptions={{
            required: true,
          }}
          register={register}
        />
        {errors.passwordDuplicate ? <ErrorMessage>{errors.passwordDuplicate.message}</ErrorMessage> : null}
        <br />
        <button type="submit" className={styles.but}>
          Submit
        </button>
      </form>
    </Modal>
  );
};
export default ChangePasswordModal;
