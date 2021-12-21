import { Dispatcher } from "@/types/types";
import React from "react";

type InputObjectRegistration = {
  name: string;
  password: string;
  passwordDuplicate: string;
};

type InputSignInObject = {
  name: string;
  password: string;
};
export interface InputTypes {
  type: string;
  name: string;
  text: string;
  value: string;
  register:any;
  errors:any;
  input?:any;
  setElem: Dispatcher<InputObjectRegistration> | Dispatcher<InputSignInObject>;
}
interface HandleChangeTarget extends EventTarget {
  target: void;
}
export interface HandleChangeTypes extends React.ChangeEvent<HTMLInputElement> {
  e: HandleChangeTarget;
}
