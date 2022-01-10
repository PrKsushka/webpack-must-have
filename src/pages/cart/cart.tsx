import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/main";
import { TopProduct } from "@/types/types";
import {
  decreaseCountAction,
  increaseCountAction,
  removeFromCartAction,
} from "@/store/modules/products/products.actions";
import styles from "./cart.module.scss";
import { setModalActive } from "@/store/modules/auth/auth.actions";
import SuccessShoppingModal from "@/components/modal/successShoppingModal/successShoppingModal";

const Cart: React.FunctionComponent = function () {
  const cart = useSelector<RootState, Array<object>>((state) => state.products.cart);
  const [checkedForDelete, setCheckedForDelete] = useState({
    isChecked: true,
  });
  const [activeSuccessShoppingModal, setActiveSuccessShoppingModal] = useState(false);
  function changeDate() {
    const date = new Date();
    let day: number | string = date.getDate();
    let month: number | string = date.getMonth() + 1;
    day < 10 ? (day = `0${day}`) : day;
    month < 10 ? (month = `0${month}`) : month;
    return `${day}/${month}/${date.getFullYear()}`;
  }
  const orderDate = changeDate();
  const dispatch = useDispatch();

  const increaseCount = (id?: number) => {
    dispatch(increaseCountAction(id));
  };
  const decreaseCount = (id?: number) => {
    dispatch(decreaseCountAction(id));
  };
  const deleteProductFromCart = ({ id, e }: { id?: number; e: React.ChangeEvent<HTMLInputElement> }) => {
    const { checked } = e.target;
    setCheckedForDelete((prevState) => ({
      ...prevState,
      isChecked: checked,
    }));
    if (checkedForDelete.isChecked) {
      dispatch(removeFromCartAction(id));
    }
  };
  const showShoppingModal = () => {
    dispatch(setModalActive());
    setActiveSuccessShoppingModal(true);
  };
  if (cart.length !== 0) {
    const result = cart
      .map((el: TopProduct) => Number(el.price) * Number(el.quantity))
      .reduce((sum, curr) => sum + curr)
      .toFixed(2);
    return (
      <div>
        <div className={styles.title}>Cart page</div>
        <table>
          <thead>
            <tr>
              <td>Name</td>
              <td>Platform</td>
              <td>Order date</td>
              <td>Amount</td>
              <td>Price ($)</td>
              <td>Delete</td>
            </tr>
          </thead>
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
                  <input type="checkbox" onChange={(e) => deleteProductFromCart({ id: el.id, e })} />
                </td>
                <td>
                  {Number(el.count) < 0 ? "Sorry, we don't have enough games for you" : ""}
                  {Number(el.quantity) <= 0 ? "Sorry, the value can't be less than 1" : ""}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td>You need to pay: {result}</td>
              <td colSpan={4} />
              <td>
                <button type="button" onClick={showShoppingModal} className={styles.changeCount}>
                  Buy
                </button>
              </td>
            </tr>
          </tfoot>
        </table>
        {activeSuccessShoppingModal && <SuccessShoppingModal />}
      </div>
    );
  }

  return <div>Your cart is empty</div>;
};
export default Cart;
