import React from "react";
import { useSelector } from "react-redux";
import CartTableHeader from "@/components/modules/cart/tables/cartTableHeader";
import CartTableMain from "@/components/modules/cart/tables/cartTableMain";
import { totalPrice } from "@/store/modules/products/product.selectors";
import { StoreState } from "@/store/types";
import CartTableFooter from "@/components/modules/cart/tables/cartTableFooter";

const CartProductsListTable: React.FunctionComponent = function () {
  const result = useSelector((state: StoreState) => totalPrice(state));

  const titlesForThead: Array<string> = ["Name", "Platform", "Order date", "Amount", "Price ($)", "Delete"];
  return (
    <table>
      <CartTableHeader titles={titlesForThead} />
      <CartTableMain />
      <CartTableFooter res={result} />
    </table>
  );
};
export default CartProductsListTable;
