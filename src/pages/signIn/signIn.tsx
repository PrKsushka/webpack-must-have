import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import Modal from "@/components/modal/modal";
import signin from "../../components/input/input.module.scss";
import Input from "@/components/input/input";
import { signInAction } from "@/store/authenticate/authActions/authActions";
import { RootState } from "@/main";
import { schema } from "@/components/input/validatorSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { dataForm } from "@/types/types";

const SignIn: React.FunctionComponent = function () {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange", resolver: yupResolver(schema) });
  const dispatch = useDispatch();

  const active = useSelector<RootState, boolean>((state) => state.auth.modalActive);
  const submitForm = (data: dataForm) => {
    dispatch(signInAction(data));
  };

  return (
    <Modal isActive={active}>
      <form className={signin.formData} onSubmit={handleSubmit(submitForm)}>
        <Input
          name="name"
          text="Log in"
          registerOptions={{
            required: true,
          }}
          register={register}
          errors={errors}
        />
        <br />
        <Input
          name="password"
          type="password"
          text="Password"
          registerOptions={{
            required: true,
          }}
          register={register}
          errors={errors}
        />
        <br />
        <button type="submit" className={signin.but}>
          Отправить
        </button>
      </form>
    </Modal>
  );
};
export default SignIn;
