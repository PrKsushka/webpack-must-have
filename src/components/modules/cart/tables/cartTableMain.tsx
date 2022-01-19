import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { TopProduct } from "@/types/productsCommon.types";
import styles from "./cartProductsListTable/cartProductListTable.module.scss";
import { RootState } from "@/main";
import changeDate from "@/utils/date";
import {
  decreaseCountAction,
  increaseCountAction,
  removeFromCartAction,
} from "@/store/modules/products/products.actions";
import { StoreState } from "@/store/types";

const CartTableMain: React.FunctionComponent = function () {
  const cart = useSelector<RootState, Array<object>>((state: StoreState) => state.products.cart);

  const orderDate = changeDate();
  const dispatch = useDispatch();

  const increaseCount = (id?: number) => {
    if(id !== undefined) { dispatch(increaseCountAction(id)) }
  };
  const decreaseCount = (id?: number) => {
    if(id !== undefined) { dispatch(decreaseCountAction(id)) }
  };
  const deleteProductFromCart = (id?: number) => {
    if(id!==undefined) { dispatch(removeFromCartAction(id)) }
  };
  return (
    <tbody>
      {cart.map((el: TopProduct) => (
        <tr key={el.id}>
          <td>{el.title}</td>
          <td>{el.category}</td>
          <td>{orderDate}</td>
          <td>
            <button
              type="button"
              disabled={Number(el.quantity) <= 0}
              onClick={() => decreaseCount(el.id)}
              className={styles.changeCount}
            >
              -
            </button>
            <span>{el.quantity}</span>
            <button
              type="button"
              disabled={Number(el.count) < 0}
              onClick={() => increaseCount(el.id)}
              className={styles.changeCount}
            >
              +
            </button>
          </td>
          <td>{el.price}</td>
          <td>
            <button type="button" onClick={() => deleteProductFromCart(el.id)} className={styles.delete} >
              Delete
            </button>
          </td>
          <td>
            {Number(el.count) < 0 ? "Sorry, we don't have enough games for you" : ""}
            {Number(el.quantity) <= 0 ? "Sorry, the value can't be less than 1" : ""}
          </td>
        </tr>
      ))}
    </tbody>
  );
};
export default CartTableMain;
