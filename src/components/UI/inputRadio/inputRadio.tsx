import React from "react";
import { useDispatch } from "react-redux";
import { Dispatcher } from "@/types/types";
import inp from "./inputRadio.module.scss";
type ObjectToSend = {
  selected: unknown;
  setSelected: Dispatcher<string>;
  sortFunc: any;
};
interface InputRadio {
  val: string;
  text: string;
  obj: ObjectToSend;
}
const inputRadio: React.FunctionComponent<InputRadio> = ({ val, text, obj }) => {
  const dispatch = useDispatch();
  const isRadioSelected = (value: string): boolean => obj.selected === value;
  const handleRadioClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    obj.setSelected(e.target.value);
    dispatch(obj.sortFunc(e.target.value));
  };
  return (
    <label className={inp.wrapper}>
      <input type="radio" value={val} checked={isRadioSelected(val)} onChange={handleRadioClick} className={inp.main} />
      {text}
    </label>
  );
};
export default inputRadio;
