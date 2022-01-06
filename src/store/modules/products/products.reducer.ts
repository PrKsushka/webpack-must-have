import {
  DATA_SORTED_BY_AGE_CONFIRMED_ACTION,
  DATA_SORTED_BY_AGE_FAILED_ACTION,
  DATA_SORTED_BY_GENRE_CONFIRMED_ACTION,
  DATA_SORTED_BY_GENRE_FAILED_ACTION,
  DATA_SORTED_BY_PRICE_CONFIRMED_ACTION,
  DATA_SORTED_BY_PRICE_FAILED_ACTION,
  DATA_SORTED_BY_RATING_CONFIRMED_ACTION,
  DATA_SORTED_BY_RATING_FAILED_ACTION,
  GET_DATA_ABOUT_PRODUCTS_CONFIRMED_ACTION,
  GET_DATA_ABOUT_PRODUCTS_FAILED_ACTION,
} from "@/store/modules/products/products.constants";
import { ProductStateTypes } from "@/store/types";

const initialState: ProductStateTypes = {
  allProducts: [],
  sortByCategory: [],
  errorMessage: "",
  successMessage: "",
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

    default:
      return state;
  }
};
export default productReducer;
