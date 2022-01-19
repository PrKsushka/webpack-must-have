import { useSelector } from "react-redux";
import React, { useState } from "react";
import { StoreState } from "../../store/types";
import styles from "./order.module.scss";
import { productsInShoppingCart } from "../../store/modules/products/product.selectors";
import SuccessShoppingModal from "../../components/modal/successShoppingModal/successShoppingModal";
import FormForOrder from "@/components/modules/order/formForOrder/formForOrder";
import ListOfOrdered from "@/components/modules/order/listOfOrdered/listOfOrdered";

const Order: React.FunctionComponent = function () {
  const [activeSuccessShoppingModal, setActiveSuccessShoppingModal] = useState(false);
  const name = useSelector((state: StoreState) => state.auth.userData.name);
  const cart = useSelector((state: StoreState) => productsInShoppingCart(state));

  return (
    <div className={styles.mainOrder}>
      {cart.length ? (
        <h3 className={styles.titleOrder}>{name}, check list of products you want to buy</h3>
      ) : (
        <h3 className={styles.titleOrder}>At first you should buy something!</h3>
      )}
     <ListOfOrdered />
      <FormForOrder funcForModal={setActiveSuccessShoppingModal} />
      {activeSuccessShoppingModal && <SuccessShoppingModal />}
    </div>
  );
};
export default Order;
