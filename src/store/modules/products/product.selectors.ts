import { createSelector } from "reselect";
import { TopProduct } from "@/types/types";

const shoppingCart = (state: unknown) => state.products.cart;

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

export const countOfProductsInShoppingCart = createSelector([productsInShoppingCart], (items) => {
  if (items.length !== 0) {
    return items.map((el: TopProduct) => el.quantity).reduce((sum: number, curr: number) => Number(sum) + Number(curr));
  }

  return 0;
});
