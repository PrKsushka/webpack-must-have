import React from "react";
import { Link } from "react-router-dom";
import { data, links } from "../../constants/routeMenuConstant";
import category from "./category.module.scss";
import { DropdownAndCategory } from "../../types/dropDownMenu.types";

const Category: React.FunctionComponent = function () {
  return (
    <>
      {data.map((elem: DropdownAndCategory) => (
        <Link to={`${links.products}/${elem.link}`} className={category.categoryItem} key={elem.id}>
          {elem.link}
        </Link>
      ))}
    </>
  );
};
export default Category;
