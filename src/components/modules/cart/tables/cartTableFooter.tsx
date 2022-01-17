import React from "react";
import styles from "@/pages/cart/cart.module.scss";
interface TfooterTypes {
  res: number | string;
  showShoppingModal: any;
}
const CartTableFooter: React.FunctionComponent<TfooterTypes> = function ({ res, showShoppingModal }) {
  return (
    <tfoot>
      <tr>
        <td>You need to pay: {res}</td>
        <td colSpan={4} />
        <td>
          <button type="button" onClick={showShoppingModal} className={styles.changeCount}>
            Buy
          </button>
        </td>
      </tr>
    </tfoot>
  );
};
export default CartTableFooter;
