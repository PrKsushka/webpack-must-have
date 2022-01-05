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
  allProducts: Array<object>;
  sortByCategory: Array<object>;
  errorMessage: string;
  successMessage: string;
}
