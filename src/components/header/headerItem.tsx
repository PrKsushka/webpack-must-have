import React from "react";
import { Link } from "react-router-dom";
import header from "./header.module.scss";
import HeaderList from "@/components/header/headerList";
import { HeaderItemTypes } from "./header.types";

const HeaderItem: React.FunctionComponent<HeaderItemTypes> = function ({ item }) {
  return (
    <li className={header.item}>
      <Link to={item.path}>{item.label}</Link>
      {item.sub && <HeaderList headerMenuArr={item.sub} root={false} />}
    </li>
  );
};
export default HeaderItem;
