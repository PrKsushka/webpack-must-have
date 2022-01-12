import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import Modal from "@/components/modal/modal";
import signin from "../../UI/input/input.module.scss";
import Input from "@/components/UI/input/input";
import { registrationAction } from "@/store/modules/auth/auth.actions";
import { RootState } from "@/main";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginRegisterSchema } from "@/components/UI/input/schemas";
import { dataForm } from "@/types/productsCommon.types";
import ErrorMessage from "@/components/errorMessage/errorMessage";
import { StoreState } from "@/store/types";

const RegistrationModal: React.FunctionComponent = function () {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange", resolver: yupResolver(loginRegisterSchema) });
  const authorized = useSelector<RootState, boolean>((state: StoreState) => state.auth.authorized);
  const history = useHistory();
  const dispatch = useDispatch();
  const { body } = document;
  const submitForm = (data: dataForm) => {
    dispatch(registrationAction(data));
    body.style.overflow="auto"
  };
  if (authorized) {
    history.push("/profile");
  } else {
    history.push("/");
  }
  return (
    <Modal>
      <form className={signin.formData} onSubmit={handleSubmit(submitForm)}>
        <Input
          name="name"
          text="Log in"
          registerOptions={{
            required: "Login is required!",
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
        <Input
          type="password"
          name="passwordDuplicate"
          text="Duplicate your password"
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
export default RegistrationModal;
