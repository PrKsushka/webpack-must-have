import { FieldValues, UseFormRegister } from "react-hook-form";

export interface SelectTypes {
  arr: Array<string>;
  defaultVal?: string;
  register: UseFormRegister<FieldValues>;
  registerOption: object;
  name: string;
}
