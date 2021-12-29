import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { loginRegisterSchema } from "@/components/UI/input/schemas";
import { dataForm } from "@/types/types";
import { changePasswordAction } from "@/store/modules/auth/auth.actions";
import signin from "@/components/UI/input/input.module.scss";
import Input from "@/components/UI/input/input";
import ErrorMessage from "@/components/errorMessage/errorMessage";
import Modal from "@/components/modal/modal";

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
    }
    reset();
  };
  return (
    <Modal>
      <form className={signin.formData} onSubmit={handleSubmit(onSubmit)} id="formElem">
        <span className={signin.changePassword}>Change Password</span>
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
