import React from "react";
import header from "../header.module.scss";
import HeaderNavItem from "./headerNavItem";
import { HeaderListTypes } from "../header.types";

const HeaderNav: React.FunctionComponent<HeaderListTypes> = function ({ headerMenuArr, root = true }) {
  const classesList = [header.menu, root ? header.menuRoot : header.menuSub].join(" ");
  return (
    <ul className={classesList}>
      {headerMenuArr.map((elem) => (
        <HeaderNavItem item={elem} key={elem.id} root />
      ))}
    </ul>
  );
};
export default HeaderNav;
