import { Rating } from "@/types/productsCommon.types";

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
type UserData = {
  name: string;
  password: string;
};
export interface AuthStateTypes {
  userData: UserData;
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
export interface StoreState {
  auth: AuthStateTypes;
  products: ProductStateTypes;
}
