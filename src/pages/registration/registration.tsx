import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import Modal from "@/components/modal/modal";
import signin from "../../components/input/input.module.scss";
import Input from "../../components/input/validator";
import { registrationAction } from "@/store/authenticate/authActions/authActions";
import { RootState } from "@/main";

const Registration: React.FunctionComponent = function () {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });
  const active = useSelector<RootState, boolean>((state) => state.auth.modalActive);
  const authorized = useSelector<RootState, boolean>((state) => state.auth.authorized);
  const history = useHistory();
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    name: "",
    password: "",
    passwordDuplicate: "",
  });
  const submitForm = () => {
    const formData = {
      name: input.name,
      password: input.password,
    };
    dispatch(registrationAction(formData));
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
        <Input
          input={input}
          type="password"
          name="passwordDuplicate"
          text="Duplicate your password"
          value={input.passwordDuplicate}
          register={register}
          errors={errors}
          setElem={setInput}
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
