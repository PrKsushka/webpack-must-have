import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setModalActive } from "@/store/modules/auth/auth.actions";
import CartTableHeader from "@/components/modules/cart/tables/cartTableHeader";
import CartTableMain from "@/components/modules/cart/tables/cartTableMain";
import { totalPrice } from "@/store/modules/products/product.selectors";
import { StoreState } from "@/store/types";
import CartTableFooter from "@/components/modules/cart/tables/cartTableFooter";
import { Dispatcher } from "../../../../../types/types";
interface ShoppingCartTable {
  funcActiveSuccessShoppingModal: Dispatcher<boolean>;
}
const CartProductsListTable: React.FunctionComponent<ShoppingCartTable> = function ({ funcActiveSuccessShoppingModal }) {
  const dispatch = useDispatch();
  const result = useSelector((state: StoreState) => totalPrice(state));
  const showShoppingModal = () => {
    dispatch(setModalActive());
    funcActiveSuccessShoppingModal(true);
  };
  const titlesForThead: Array<string> = ["Name", "Platform", "Order date", "Amount", "Price ($)", "Delete"];
  return (
    <table>
      <CartTableHeader titles={titlesForThead} />
      <CartTableMain />
      <CartTableFooter res={result} showShoppingModal={showShoppingModal} />
    </table>
  );
};
export default CartProductsListTable;
