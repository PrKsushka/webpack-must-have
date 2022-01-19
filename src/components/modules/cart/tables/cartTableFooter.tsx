import React from "react";
import { useHistory } from "react-router-dom";
import styles from "./cartProductsListTable/cartProductListTable.module.scss";
import { links } from "@/constants/routeMenuConstant";

interface TfooterTypes {
  res: number | string;
}
const CartTableFooter: React.FunctionComponent<TfooterTypes> = function ({ res }) {
  const history = useHistory();
  const goToOrderPage = () => {
    history.push(links.order);
  };
  return (
    <tfoot>
      <tr>
        <td>You need to pay: {res}$</td>
        <td colSpan={4} />
        <td>
          <button type="button" className={styles.buy} onClick={goToOrderPage}>
            Buy
          </button>
        </td>
      </tr>
    </tfoot>
  );
};
export default CartTableFooter;
