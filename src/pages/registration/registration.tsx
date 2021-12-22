import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import Modal from "@/components/modal/modal";
import signin from "../../components/input/input.module.scss";
import Input from "@/components/input/input";
import { registrationAction } from "@/store/authenticate/authActions/authActions";
import { RootState } from "@/main";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "@/components/input/validatorSchema";
import { dataForm } from "@/types/types";

const Registration: React.FunctionComponent = function () {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange", resolver: yupResolver(schema) });
  const active = useSelector<RootState, boolean>((state) => state.auth.modalActive);
  const authorized = useSelector<RootState, boolean>((state) => state.auth.authorized);
  const history = useHistory();
  const dispatch = useDispatch();

  const submitForm = (data: dataForm) => {
    dispatch(registrationAction(data));
  };
  if (authorized) {
    history.push("/profile");
  } else {
    history.push("/");
  }
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
        <Input
          type="password"
          name="passwordDuplicate"
          text="Duplicate your password"
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
export default Registration;
