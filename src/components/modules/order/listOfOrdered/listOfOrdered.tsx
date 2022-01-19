import React from "react";
import { useSelector } from "react-redux";
import styles from "./listOfOrdered.module.scss";
import { StoreState } from "../../../../store/types";
import { productsInShoppingCart } from "../../../../store/modules/products/product.selectors";

const ListOfOrdered: React.FunctionComponent = function () {
  const cart = useSelector((state: StoreState) => productsInShoppingCart(state));
  return (
    <div className={styles.cardWrapper}>
      {cart.map((el) => (
        <div key={el.id} className={styles.orderCard}>
          <p>{el.title}</p>
          <p>{el.category}</p>
          <p>{el.quantity} piece</p>
          <p>{el.price} $</p>
        </div>
      ))}
    </div>
  );
};
export default ListOfOrdered;
