import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./cart.module.scss";
import { setModalActive } from "@/store/modules/auth/auth.actions";
import SuccessShoppingModal from "@/components/modal/successShoppingModal/successShoppingModal";
import Thead from "@/components/modules/cart/tables/thead";
import Tfooter from "@/components/modules/cart/tables/tfooter";
import Tbody from "@/components/modules/cart/tables/tbody";
import { totalPrice, productsInShoppingCart } from "@/store/modules/products/product.selectors";
import { StoreState } from "@/store/types";


const Cart: React.FunctionComponent = function () {
  const [activeSuccessShoppingModal, setActiveSuccessShoppingModal] = useState(false);
  const dispatch = useDispatch();
  const cart = useSelector((state: StoreState) => productsInShoppingCart(state));
  const result = useSelector((state: StoreState) => totalPrice(state));
  const showShoppingModal = () => {
    dispatch(setModalActive());
    setActiveSuccessShoppingModal(true);
  };
  const titlesForThead: Array<string> = ["Name", "Platform", "Order date", "Amount", "Price ($)", "Delete"];
  if (cart.length) {
    return (
      <div>
        <div className={styles.title}>Cart page</div>
        <table>
          <Thead titles={titlesForThead} />
          <Tbody />
          <Tfooter res={result} showShoppingModal={showShoppingModal} />
        </table>
        {activeSuccessShoppingModal && <SuccessShoppingModal />}
      </div>
    );
  }

  return <div>Your cart is empty</div>;
};
export default Cart;
