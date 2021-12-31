import React from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import Modal from "@/components/modal/modal";
import signin from "../../UI/input/input.module.scss";
import Input from "@/components/UI/input/input";
import { signInAction } from "@/store/modules/auth/auth.actions";
import { loginRegisterSchema } from "@/components/UI/input/schemas";
import { yupResolver } from "@hookform/resolvers/yup";
import { dataForm } from "@/types/types";
import ErrorMessage from "@/components/errorMessage/errorMessage";


const SignInModal: React.FunctionComponent = function () {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange", resolver: yupResolver(loginRegisterSchema) });
  const dispatch = useDispatch();
  const { body } = document;
  const submitForm = (data: dataForm) => {
    dispatch(signInAction(data));
    body.style.overflow="auto"
  };

  return (
    <Modal>
      <form className={signin.formData} onSubmit={handleSubmit(submitForm)}>
        <Input
          name="name"
          text="Log in"
          registerOptions={{
            required: true,
          }}
          register={register}
        />
        {errors.name ? <ErrorMessage>{errors.name.message}</ErrorMessage> : null}
        <br />
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
        <button type="submit" className={signin.but}>
          Submit
        </button>
      </form>
    </Modal>
  );
};
export default SignInModal;
