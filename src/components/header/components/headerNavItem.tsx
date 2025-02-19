import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import header from "../header.module.scss";
import { HeaderItemTypes } from "../header.types";
import { RootState } from "@/main";
import { signInParamsAction } from "@/store/modules/auth/auth.actions";
import HeaderNav from "@/components/header/components/headerNav";
import { StoreState } from "@/store/types";

const HeaderNavItem: React.FunctionComponent<HeaderItemTypes> = function ({ item }) {
  const auth = useSelector<RootState, boolean>((state: StoreState) => state.auth.authorized);
  const dispatch = useDispatch();
  const onAuthUser = () => {
    if (!auth) {
      dispatch(signInParamsAction());
    }
  };
  return (
    <li className={header.item} onClick={onAuthUser}>
      <Link to={item.path}>{item.label}</Link>
      {item.sub && <HeaderNav headerMenuArr={item.sub} root={false} />}
    </li>
  );
};
export default HeaderNavItem;
