import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { data, links } from "../../constants/routeMenuConstant";
import category from "./category.module.scss";
import { DropdownAndCategory } from "../../types/dropDownMenu.types";
import { StoreState } from "@/store/types";
import { signInParamsAction } from "@/store/modules/auth/auth.actions";

const Category: React.FunctionComponent = function () {
  const dispatch = useDispatch();
  const auth = useSelector((state: StoreState) => state.auth.authorized);
  const checkAuth = () => {
    if (!auth) {
      dispatch(signInParamsAction());
    }
  };
  return (
    <>
      {data.map((elem: DropdownAndCategory) => (
        <Link to={`${links.products}/${elem.link}`} className={category.categoryItem} key={elem.id} onClick={checkAuth}>
          {elem.link}
        </Link>
      ))}
    </>
  );
};
export default Category;
