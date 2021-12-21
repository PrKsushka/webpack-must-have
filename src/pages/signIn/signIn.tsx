import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import Modal from "@/components/modal/modal";
import signin from "../../components/input/input.module.scss";
import Input from "@/components/input/validator";
import { signInAction } from "@/store/authenticate/authActions/authActions";
import { RootState } from "@/main";


const SignIn: React.FunctionComponent = function () {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    name: "",
    password: "",
  });

  const active = useSelector<RootState, boolean>((state) => state.auth.modalActive);
  const submitForm = () => {
    const formData = {
      name: input.name,
      password: input.password,
    };
    dispatch(signInAction(formData));
  };

  return (
    <Modal isActive={active}>
      <form className={signin.formData} onSubmit={handleSubmit(submitForm)}>
        <Input
          name="name"
          type="text"
          text="Log in"
          value={input.name}
          setElem={setInput}
          register={register}
          errors={errors}
        />
        <br />
        <Input
          name="password"
          type="password"
          text="Password"
          value={input.password}
          setElem={setInput}
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
