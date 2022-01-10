import { Rating } from "@/types/types";

interface ProductReducer {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  genres: string;
  age: string;
  image: string;
  date: string;
  quantity: number;
  count: number;
  rating: Rating;
}
export interface AuthStateTypes {
  userData: object;
  authorized: boolean;
  errorMessage: string;
  successMessage: string;
  modalActive: boolean;
  userSignIn: boolean;
  userRegister: boolean;
  signInMenu: boolean;
}
export interface ProductStateTypes {
  allProducts: Array<ProductReducer>;
  sortByCategory: Array<object>;
  errorMessage: string;
  successMessage: string;
  cart: Array<ProductReducer>;
}
