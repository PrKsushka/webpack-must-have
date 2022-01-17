import React from "react";


export interface InputTypes {
  type?: string;
  name: string;
  text: string;
  register:any;
  errors?:any;
  registerOptions: object;
  value?: string;
}
interface HandleChangeTarget extends EventTarget {
  target: void;
}
export interface HandleChangeTypes extends React.ChangeEvent<HTMLInputElement> {
  e: HandleChangeTarget;
}
