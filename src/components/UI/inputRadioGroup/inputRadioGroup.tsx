import React from "react";
import { useDispatch } from "react-redux";
import { Dispatcher } from "@/types/types";
import styles from "./inputRadioGroup.module.scss";

type ObjectToSend = {
  selected: boolean | string;
  setSelected: Dispatcher<string>;
  sortFunc: any;
  values: Array<string>;
};
interface InputRadioGroup {
  obj: ObjectToSend;
}
const InputRadioGroup: React.FunctionComponent<InputRadioGroup> = ({ obj }) => {
  const dispatch = useDispatch();
  const isRadioSelected = (value: string): boolean => obj.selected === value;
  const handleRadioClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    obj.setSelected(e.target.value);
    dispatch(obj.sortFunc(e.target.value));
  };
  return (
    <div className={styles.radioButtonGroup}>
      {obj.values.map((el, i) => (
        <label key={i} className={styles.wrapper}>
          <input
            type="radio"
            value={el}
            checked={isRadioSelected(el)}
            onChange={handleRadioClick}
            className={styles.main}
          />
          {el}
        </label>
      ))}
    </div>
  );
};
export default InputRadioGroup;
