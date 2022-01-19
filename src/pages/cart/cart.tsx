import React, { Suspense } from "react";
import { useSelector } from "react-redux";
import styles from "./cart.module.scss";
import { productsInShoppingCart } from "@/store/modules/products/product.selectors";
import { StoreState } from "@/store/types";
import Preloader from "@/components/UI/preloader/preloader";

const CartProductsListTable = React.lazy(
  () => import("@/components/modules/cart/tables/cartProductsListTable/cartProductsListTable")
);

const Cart: React.FunctionComponent = function () {
  const cart = useSelector((state: StoreState) => productsInShoppingCart(state));
  if (cart.length) {
    return (
      <div>
        <div className={styles.title}>Cart page</div>
        <Suspense fallback={<Preloader />}>
          <CartProductsListTable />
        </Suspense>
      </div>
    );
  }

  return <div>Your cart is empty</div>;
};
export default Cart;
