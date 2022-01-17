import React from "react";
import { InputCheckboxTypes } from "@/components/UI/inputCheckbox/inputCheckbox.types";
import styles from "./inputCheckbox.module.scss";

const InputCheckbox: React.FunctionComponent<InputCheckboxTypes> = function ({ arr, name, register, registerOption }) {
  return (
    <>
      {arr.map((el, i) => (
        <label key={i} className={styles.elements}>
          <input type="checkbox" value={el} {...register(name, registerOption)} />
          {el}
        </label>
      ))}
    </>
  );
};
export default InputCheckbox;
