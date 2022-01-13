import { createSelector } from "reselect";
import { TopProduct } from "@/types/productsCommon.types";
import { StoreState } from "@/store/types";

const shoppingCart = (state: StoreState) => state.products.cart;

export const productsInShoppingCart = createSelector(shoppingCart, (items) => items);

export const totalPrice = createSelector(productsInShoppingCart, (items) => {
  if (items.length !== 0) {
    return items
      .map((el: TopProduct) => Number(el.price) * Number(el.quantity))
      .reduce((sum: number, curr: number) => sum + curr)
      .toFixed(2);
  }
  return 0;
});

export const countOfProductsInShoppingCart = createSelector(productsInShoppingCart, (items: TopProduct[]): number => {
  if (items.length !== 0) {
    return items.reduce((sum: number, item: TopProduct) => sum + Number(item.quantity), 0);
  }

  return 0;
});
