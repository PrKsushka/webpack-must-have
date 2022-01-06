import React, { ChangeEventHandler } from "react";
import product from "@/pages/product/product.module.scss";

type SendObj = {
  select: string;
  funcSelect: ChangeEventHandler<HTMLSelectElement> | undefined;
  values: Array<string>;
};
interface SelectType {
  obj: SendObj;
}
const Select: React.FunctionComponent<SelectType> = function ({ obj }) {
  return (
    <select value={obj.select} onChange={obj.funcSelect} className={product.selected}>
      <option defaultValue="" selected hidden>
        Choose
      </option>
      {obj.values.map((el, i) => (
        <option key={i}>{el}</option>
      ))}
    </select>
  );
};
export default Select;
