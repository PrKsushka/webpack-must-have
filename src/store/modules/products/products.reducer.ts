import {
  ADD_TO_CART_ACTION,
  DATA_SORTED_BY_AGE_CONFIRMED_ACTION,
  DATA_SORTED_BY_AGE_FAILED_ACTION,
  DATA_SORTED_BY_GENRE_CONFIRMED_ACTION,
  DATA_SORTED_BY_GENRE_FAILED_ACTION,
  DATA_SORTED_BY_PRICE_CONFIRMED_ACTION,
  DATA_SORTED_BY_PRICE_FAILED_ACTION,
  DATA_SORTED_BY_RATING_CONFIRMED_ACTION,
  DATA_SORTED_BY_RATING_FAILED_ACTION,
  DECREASE_COUNT_ACTION,
  GET_DATA_ABOUT_PRODUCTS_CONFIRMED_ACTION,
  GET_DATA_ABOUT_PRODUCTS_FAILED_ACTION,
  INCREASE_COUNT_ACTION,
  REMOVE_FROM_CART_ACTION,
} from "@/store/modules/products/products.constants";
import { ProductStateTypes } from "@/store/types";
import { TopProduct } from "@/types/types";

const initialState: ProductStateTypes = {
  allProducts: [],
  sortByCategory: [],
  errorMessage: "",
  successMessage: "",
  cart: [],
};
type ProductAcion = {
  type: string;
  payload?: Array<object> | object | unknown;
};
const productReducer = (state = initialState, action: ProductAcion = { type: "DEFAULT" }) => {
  switch (action.type) {
    case GET_DATA_ABOUT_PRODUCTS_CONFIRMED_ACTION:
      return {
        ...state,
        allProducts: action.payload,
        successMessage: "Good",
      };
    case GET_DATA_ABOUT_PRODUCTS_FAILED_ACTION:
      return {
        ...state,
        errorMessage: action.payload,
        allProducts: [],
      };
    case DATA_SORTED_BY_RATING_CONFIRMED_ACTION:
      return {
        ...state,
        allProducts: action.payload,
        successMessage: "data sorted by rating",
      };
    case DATA_SORTED_BY_RATING_FAILED_ACTION:
      return {
        ...state,
        successMessage: "",
        errorMessage: action.payload,
      };
    case DATA_SORTED_BY_PRICE_CONFIRMED_ACTION:
      return {
        ...state,
        allProducts: action.payload,
        successMessage: "data sorted by price",
      };
    case DATA_SORTED_BY_PRICE_FAILED_ACTION:
      return {
        ...state,
        allProducts: [],
        successMessage: "",
        errorMessage: action.payload,
      };
    case DATA_SORTED_BY_AGE_CONFIRMED_ACTION:
      return {
        ...state,
        allProducts: action.payload,
        successMessage: "data sorted by age",
      };
    case DATA_SORTED_BY_AGE_FAILED_ACTION:
      return {
        ...state,
        allProducts: [],
        successMessage: "",
        errorMessage: action.payload,
      };
    case DATA_SORTED_BY_GENRE_CONFIRMED_ACTION:
      return {
        ...state,
        allProducts: action.payload,
        successMessage: "data sorted by age",
      };
    case DATA_SORTED_BY_GENRE_FAILED_ACTION:
      return {
        ...state,
        allProducts: [],
        successMessage: "",
        errorMessage: action.payload,
      };
    case ADD_TO_CART_ACTION: {
      const foundProduct = state.allProducts.find((el: TopProduct) => el.id === action.payload);
      const newCart = [...state.cart];

      if (foundProduct) {
        const countOfProduct = foundProduct.count;
        const foundIndex = newCart.findIndex((el: TopProduct) => el.id === foundProduct?.id);

        if (foundIndex >= 0) {
          const newQuantity = Number(newCart[foundIndex].quantity + foundProduct.quantity);
          if (countOfProduct && newQuantity <= countOfProduct)
            newCart[foundIndex] = {
              ...foundProduct,
              quantity: newQuantity,
              count: countOfProduct - newQuantity,
            };
        } else {
          newCart.push({ ...foundProduct, count: countOfProduct - 1 });
        }
      }
      return {
        ...state,
        cart: newCart,
      };
    }
    case REMOVE_FROM_CART_ACTION: {
      const removeProduct = state.cart.filter((el: TopProduct) => el.id !== action.payload);
      return {
        ...state,
        cart: [...removeProduct],
      };
    }
    case INCREASE_COUNT_ACTION: {
      const increaseCount = state.cart.map((el) =>
        el.id === action.payload && el.quantity !== undefined
          ? { ...el, quantity: el.quantity + 1, count: el.count - 1 }
          : el
      );
      return {
        ...state,
        cart: [...increaseCount],
      };
    }
    case DECREASE_COUNT_ACTION: {
      const decreaseCount = state.cart.map((el) =>
        el.id === action.payload && el.quantity !== undefined
          ? { ...el, quantity: el.quantity - 1, count: el.count + 1 }
          : el
      );
      return {
        ...state,
        cart: [...decreaseCount],
      };
    }
    default:
      return state;
  }
};
export default productReducer;
