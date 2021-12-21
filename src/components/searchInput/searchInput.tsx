import React, { useState } from "react";
import axios from "axios";
import MoonLoader from "react-spinners/MoonLoader";
import s from "./searchInput.module.scss";
import useDebounce from "../debounceHook/debounceHook";

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}
const SearchInput: React.FunctionComponent = function () {
  const [input, setInput] = useState<string>("");
  const [postFound, setPostFound] = useState<Array<Post>>([]);
  const [isExpanded, setExpanded] = useState(false);
  const [isLoading, setLoading] = useState(false);
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInput(e.target.value);
  }
  const expandedContainer = () => {
    setExpanded(true);
  };
  const postAlert = () => {
    alert("add");
  };
  const prepareUrl = (query: string) => {
    const url = `https://jsonplaceholder.typicode.com/posts?q=${query}`;
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
  const printInformation = (arr: Array<Post>) => arr.filter((val: Post) => val.title.toLowerCase().includes(input.toLowerCase()));
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
        ? printInformation(postFound).map((val: Post) => (
            <div key={val.id} onClick={postAlert} className={s.foundElements}>
              {val.title}
            </div>
          ))
        : input === ""}
    </div>
  );
};
export default SearchInput;
