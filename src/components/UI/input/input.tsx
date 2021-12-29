import React from "react";
import signin from "./input.module.scss";
import { InputTypes } from "@/components/UI/input/input.types";

const Input: React.FunctionComponent<InputTypes> = function ({ name, type = "text", text, registerOptions, register }) {
  return (
    <label className={signin.wrapper}>
      <span className={signin.title}>{text}</span>
      <input {...register(name, registerOptions)} type={type} name={name} />
    </label>
  );
};
export default Input;
