import {
  ADD_NEW_POSITION,
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
  LOG_OUT_FROM_CART_ACTION,
  REMOVE_FROM_CART_ACTION,
  REMOVE_FROM_LIST_OF_PRODUCTS,
  UPDATE_PRODUCT_ACTION,
} from "@/store/modules/products/products.constants";
import { ProductReducer, ProductStateTypes } from "@/store/types";
import { TopProduct } from "@/types/productsCommon.types";

const initialState: ProductStateTypes = {
  allProducts: [],
  newProducts: [],
  errorMessage: "",
  successMessage: "",
  cart: [],
};
type ProductAction = {
  type: string;
  payload?: Array<ProductReducer> | number;
};
const productReducer = (state = initialState, action: ProductAction = { type: "DEFAULT" }) => {
  switch (action.type) {
    case GET_DATA_ABOUT_PRODUCTS_CONFIRMED_ACTION: {
      const products = action.payload as Array<ProductReducer>;
      const freshProducts = products.slice(0, 3);
      return {
        ...state,
        allProducts: [...products],
        newProducts: [...freshProducts],
        successMessage: "Good",
      };
    }
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
    case REMOVE_FROM_LIST_OF_PRODUCTS: {
      return {
        ...state,
        allProducts: action.payload,
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
    case UPDATE_PRODUCT_ACTION: {
      return {
        ...state,
        allProducts: action.payload,
      };
    }
    case ADD_NEW_POSITION: {
      return {
        ...state,
        allProducts: action.payload,
      };
    }
    case LOG_OUT_FROM_CART_ACTION:
      return {
        ...state,
        cart: [],
      };
    default:
      return state;
  }
};
export default productReducer;
