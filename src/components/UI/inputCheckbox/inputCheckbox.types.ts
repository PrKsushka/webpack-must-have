import { FieldValues, UseFormRegister } from "react-hook-form";

export interface InputCheckboxTypes {
  arr: Array<string>;
  register: UseFormRegister<FieldValues>;
  registerOption: object;
  name: string;
}
