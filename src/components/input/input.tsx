import React from "react";
import signin from "./input.module.scss";
import { InputTypes } from "@/components/input/input.types";

const Input: React.FunctionComponent<InputTypes> = function ({ name, type="text", text, registerOptions, register, errors }) {
  return (
    <label className={signin.wrapper}>
      <span className={signin.title}>{text}</span>
      <input {...register(name, registerOptions)} type={type} name={name} />
      {name === "name" ? errors.name?.message : errors.password?.message}
      {name === "passwordDuplicate" ? errors.passwordDuplicate?.message : null}
    </label>
  );
};
export default Input;
