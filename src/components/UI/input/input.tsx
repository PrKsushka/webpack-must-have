import React from "react";
import styles from "./input.module.scss";
import { InputTypes } from "@/components/UI/input/input.types";

const Input: React.FunctionComponent<InputTypes> = function ({ name, type = "text", text, registerOptions, register, value }) {
  return (
    <label className={styles.wrapper}>
      <span className={styles.title}>{text}</span>
      <input {...register(name, registerOptions)} type={type} name={name} defaultValue={value} />
    </label>
  );
};
export default Input;
