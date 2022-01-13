import { Action, Dispatch } from "redux";
import { getProducts, getProductsByAge, getProductsByGenre, getProductsByType } from "@/api/dataAboutProducts";
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
  SORT_PRODUCTS_BY_CATEGORY,
} from "@/store/modules/products/products.constants";

export function getDataAboutProductsConfirmedAction(data: Array<object>) {
  return {
    type: GET_DATA_ABOUT_PRODUCTS_CONFIRMED_ACTION,
    payload: data,
  };
}
export function getDataAboutProductsFailedAction(message: string) {
  return {
    type: GET_DATA_ABOUT_PRODUCTS_FAILED_ACTION,
    payload: message,
  };
}
export function getDataAboutProducts() {
  return (dispatch: Dispatch<Action>) => {
    getProducts()
      .then((res) => {
        if (res.data) {
          dispatch(getDataAboutProductsConfirmedAction(res.data));
        } else {
          throw Error();
        }
      })
      .catch((err) => {
        dispatch(getDataAboutProductsFailedAction(err));
      });
  };
}
export function sortProductsByCategory(platform: string) {
  return {
    type: SORT_PRODUCTS_BY_CATEGORY,
    payload: platform,
  };
}
export function dataSortedByRatingConfirmedAction(data: Array<object>) {
  return {
    type: DATA_SORTED_BY_RATING_CONFIRMED_ACTION,
    payload: data,
  };
}
export function dataSortedByRatingFailedAction(message: string) {
  return {
    type: DATA_SORTED_BY_RATING_FAILED_ACTION,
    payload: message,
  };
}
export function dataSortedByRating(value: string) {
  return (dispatch: Dispatch<Action>) => {
    getProductsByType("sortRate", value)
      .then((res) => {
        if (res.data) {
          dispatch(dataSortedByRatingConfirmedAction(res.data));
        } else {
          throw Error();
        }
      })
      .catch((err) => {
        dispatch(dataSortedByRatingFailedAction(err));
      });
  };
}
export function dataSortedByPriceConfirmedAction(data: Array<object>) {
  return {
    type: DATA_SORTED_BY_PRICE_CONFIRMED_ACTION,
    payload: data,
  };
}
export function dataSortedByPriceFailedAction(message: string) {
  return {
    type: DATA_SORTED_BY_PRICE_FAILED_ACTION,
    payload: message,
  };
}
export function dataSortedByPrice(value: string) {
  return (dispatch: Dispatch<Action>) => {
    getProductsByType("sortPrice", value)
      .then((res) => {
        if (res.data) {
          dispatch(dataSortedByPriceConfirmedAction(res.data));
        } else {
          throw Error();
        }
      })
      .catch((err) => {
        dispatch(dataSortedByPriceFailedAction(err));
      });
  };
}
export function dataSortedByGenreConfirmedAction(data: Array<object>) {
  return {
    type: DATA_SORTED_BY_GENRE_CONFIRMED_ACTION,
    payload: data,
  };
}
export function dataSortedByGenreFailedAction(message: string) {
  return {
    type: DATA_SORTED_BY_GENRE_FAILED_ACTION,
    payload: message,
  };
}
export function dataSortedByGenre(value: string) {
  return (dispatch: Dispatch<Action>) => {
    getProductsByGenre(value)
      .then((res) => {
        if (res.data) {
          dispatch(dataSortedByGenreConfirmedAction(res.data));
        } else {
          throw Error();
        }
      })
      .catch((err) => {
        dispatch(dataSortedByGenreFailedAction(err));
      });
  };
}
export function dataSortedByAgeConfirmedAction(data: Array<object>) {
  return {
    type: DATA_SORTED_BY_AGE_CONFIRMED_ACTION,
    payload: data,
  };
}
export function dataSortedByAgeFailedAction(message: string) {
  return {
    type: DATA_SORTED_BY_AGE_FAILED_ACTION,
    payload: message,
  };
}
export function dataSortedByAge(value: string) {
  return (dispatch: Dispatch<Action>) => {
    getProductsByAge(value)
      .then((res) => {
        if (res.data) {
          dispatch(dataSortedByAgeConfirmedAction(res.data));
        } else {
          throw Error();
        }
      })
      .catch((err) => {
        dispatch(dataSortedByAgeFailedAction(err));
      });
  };
}
export function addToCartAction(id: number | undefined) {
  return {
    type: ADD_TO_CART_ACTION,
    payload: id,
  };
}
export function removeFromCartAction(id: number | undefined) {
  return {
    type: REMOVE_FROM_CART_ACTION,
    payload: id,
  };
}
export function increaseCountAction(id: number | undefined) {
  return {
    type: INCREASE_COUNT_ACTION,
    payload: id,
  };
}
export function decreaseCountAction(id: number | undefined) {
  return {
    type: DECREASE_COUNT_ACTION,
    payload: id,
  };
}
