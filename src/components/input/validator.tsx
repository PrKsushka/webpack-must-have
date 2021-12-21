import React from "react";
import signin from "./input.module.scss";
import { InputTypes } from "@/components/input/validationTypes";

const Input: React.FunctionComponent<InputTypes> = function ({
  name,
  type,
  input,
  text,
  value,
  setElem,
  register,
  errors,
}) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setElem((prevInput: any) => ({
      ...prevInput,
      [name]: value,
    }));
  };

  return (
    <label className={signin.wrapper}>
      <span className={signin.title}>{text}</span>
      <input
        {...register(name, {
          required: "Required",
          onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
            handleChange(e);
          },
          validate:
            name === "passwordDuplicate"
              ? (value:string) => {
                  if (value === input.password) {
                    return true;
                  }
                  return "Passwords do not match";
                }
              : "",
        })}
        type={type}
        name={name}
        defaultValue={value}
      />

      {name === "name" ? errors.name?.message : errors.password?.message}
      {name === "passwordDuplicate" ? errors.passwordDuplicate?.message : null}
    </label>
  );
};
export default Input;
