import React from "react";
import { useDispatch } from "react-redux";
import { dataSortedByPrice, dataSortedByRating } from "@/store/modules/products/products.actions";
import { Dispatcher } from "@/types/types";
import Select from "@/components/UI/select/select";

interface SelectType {
  selected: string;
  setSelected: Dispatcher<string>;
}
const SortAscDesc: React.FunctionComponent<SelectType> = function ({ selected, setSelected }) {
  const dispatch = useDispatch();
  const changeSelect = (e: { target: { value: React.SetStateAction<string> } }) => {
    setSelected(e.target.value);
    const asc = "asc";
    const desc = "desc";
    if (e.target.value === "Rating ascending") {
      dispatch(dataSortedByRating(asc));
    } else if (e.target.value === "Rating descending") {
      dispatch(dataSortedByRating(desc));
    } else if (e.target.value === "Price ascending") {
      dispatch(dataSortedByPrice(asc));
    } else if (e.target.value === "Price descending") {
      dispatch(dataSortedByPrice(desc));
    }
  };
  const obj = {
    select: selected,
    funcSelect: changeSelect,
    values: ["Rating ascending", "Rating descending", "Price ascending", "Price descending"],
  };
  return <Select obj={obj} />;
};
export default SortAscDesc;
