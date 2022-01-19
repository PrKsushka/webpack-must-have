import React, { useState } from "react";
import axios from "axios";
import MoonLoader from "react-spinners/MoonLoader";
import { useDispatch, useSelector } from "react-redux";
import s from "./searchInput.module.scss";
import useDebounce from "../../hooks/debounceHook/debounceHook";
import { Product, TopProduct } from "@/types/productsCommon.types";
import { addToCartAction } from "@/store/modules/products/products.actions";
import { StoreState } from "@/store/types";
import { signInParamsAction } from "@/store/modules/auth/auth.actions";

const SearchInput: React.FunctionComponent = function () {
  const [input, setInput] = useState<string>("");
  const [postFound, setPostFound] = useState<Array<Product>>([]);
  const [isExpanded, setExpanded] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const auth = useSelector((state: StoreState) => state.auth.authorized);
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (auth) {
      setInput(e.target.value);
    } else {
      dispatch(signInParamsAction());
    }
  }
  const expandedContainer = () => {
    setExpanded(true);
  };
  const postAlert = (id: number | undefined) => {
    dispatch(addToCartAction(id));
  };
  const prepareUrl = (query: string) => {
    const url = `/api/search/${query}`;
    console.log(encodeURI(url));
    return encodeURI(url);
  };

  const searchName = async () => {
    if (!input || input.trim() === "") return;

    setLoading(true);
    const URL = prepareUrl(input);
    const response = await axios.get(URL).catch((err) => {
      console.log("Error: ", err);
    });
    if (response) {
      setPostFound(response.data);
      setLoading(false);
    }
  };
  useDebounce(input, 500, searchName);
  // const printInformation = (arr: Array<Product>) =>
  //   arr.filter((val: Product) => val.title.toLowerCase().includes(input.toLowerCase()));

  return (
    <div className={s.search}>
      <input
        type="text"
        name="search"
        placeholder="Search"
        value={input}
        autoComplete="off"
        onChange={handleChange}
        onFocus={expandedContainer}
        // onBlur={lostExpandedContainer}
      />
      {isLoading && <MoonLoader loading color="#000" size={20} />}
      {isExpanded && input !== ""
        ? postFound.map((val: TopProduct) => (
            <div key={val.id} onClick={() => postAlert(val.id)} className={s.foundElements}>
              <img src={val.image} alt="found Picture" />
              <p>{val.title}</p>
              <p>{val.price}$</p>
            </div>
          ))
        : input === ""}
    </div>
  );
};
export default SearchInput;
