import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { loginRegisterSchema } from "@/components/UI/input/schemas";
import { dataForm } from "@/types/productsCommon.types";
import { changePasswordAction } from "@/store/modules/auth/auth.actions";
import signin from "@/components/UI/input/input.module.scss";
import Input from "@/components/UI/input/input";
import ErrorMessage from "@/components/errorMessage/errorMessage";
import Modal from "@/components/modal/modal";
import { RootState } from "@/main";
import { StoreState } from "@/store/types";

const ChangePasswordModal: React.FunctionComponent = function () {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange", resolver: yupResolver(loginRegisterSchema) });
  const dispatch = useDispatch();
  const { body } = document;
  const onSubmit = (data: dataForm) => {
    if (data) {
      dispatch(changePasswordAction(data));
      body.style.overflow="auto"
    }
    reset();
  };
  const isActive = useSelector<RootState, boolean>((state: StoreState) => state.auth.modalActive);
  return (
    <Modal isActive={isActive}>
      <form className={signin.formData} onSubmit={handleSubmit(onSubmit)}>
        <h3 className={signin.changePassword}>Change Password</h3>
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
        <button type="submit" className={signin.but}>
          Submit
        </button>
      </form>
    </Modal>
  );
};
export default ChangePasswordModal;
