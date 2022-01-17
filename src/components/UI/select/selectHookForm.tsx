import React from "react";
import { SelectTypes } from "@/components/UI/select/select.types";

export const SelectHookForm: React.FunctionComponent<SelectTypes> = function ({
  arr,
  name,
  defaultVal,
  registerOption,
  register,
}) {
  return (
    <select {...register(name, registerOption)}>
      <option value={defaultVal} hidden>
        {defaultVal}
      </option>
      {arr.map((el, i) => (
        <option key={i} value={el}>
          {el}
        </option>
      ))}
    </select>
  );
};

export default SelectHookForm;
