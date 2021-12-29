import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import header from "./header.module.scss";
import HeaderList from "@/components/header/headerList";
import { HeaderItemTypes } from "./header.types";
import { RootState } from "@/main";
import { signInParamsAction } from "@/store/authenticate/authActions";

const HeaderItem: React.FunctionComponent<HeaderItemTypes> = function ({ item }) {
  const auth = useSelector<RootState, boolean>((state) => state.auth.authorized);
  const dispatch = useDispatch();
  const authUser = () => {
    if (!auth) {
      dispatch(signInParamsAction());
    }
  };
  return (
    <li className={header.item} onClick={authUser}>
      <Link to={item.path}>{item.label}</Link>
      {item.sub && <HeaderList headerMenuArr={item.sub} root={false} />}
    </li>
  );
};
export default HeaderItem;
