import {
  CHANGE_DATA_ABOUT_USER_CONFIRMED_ACTION,
  CHANGE_PASSWORD_CONFIRMED_ACTION,
  CHANGE_PASSWORD_FAILED_ACTION,
  LOG_OUT_ACTION,
  REGISTER_CLICK_ACTION,
  REGISTRATION_CONFIRMED_ACTION,
  REGISTRATION_FAILED_ACTION,
  SET_MODAL_ACTIVE,
  SET_MODAL_IN_ACTIVE,
  SIGN_IN_MODAL_ACTIVE,
  SIGN_IN_CONFIRMED_ACTION,
  SIGN_IN_FAILED_ACTION,
  SIGN_IN_PARAMS_ACTION,
  SHOW_EDIT_MODAL,
  SHOW_ADD_NEW_PRODUCT_MODAL,
} from "@/store/modules/auth/auth.constants";

import { AuthStateTypes } from "@/store/types";

const initialState: AuthStateTypes = {
  userData: {
    name: "",
    password: "",
  },
  authorized: false,
  errorMessage: "",
  successMessage: "",
  modalActive: true,
  userSignIn: false,
  userRegister: false,
  signInMenu: false,
  editModal: false,
  addNewProductModal: false,
};
type AuthAction = {
  type: string;
  payload?: Array<object> | object | unknown;
};
const authReducer = (state = initialState, action: AuthAction = { type: "DEFAULT" }) => {
  switch (action.type) {
    case SIGN_IN_CONFIRMED_ACTION:
      return {
        ...state,
        userData: action.payload,
        authorized: true,
        errorMessage: "",
        successMessage: "Sign In is completed",
        modalActive: false,
        userRegister: false,
        userSignIn: false,
      };
    case SIGN_IN_FAILED_ACTION:
      return {
        ...state,
        errorMessage: action.payload,
        authorized: false,
        modalActive: false,
        userRegister: false,
        userSignIn: false,
      };
    case REGISTRATION_CONFIRMED_ACTION:
      return {
        ...state,
        userData: action.payload,
        authorized: true,
        successMessage: "RegistrationModal is completed",
        modalActive: false,
        userRegister: false,
        userSignIn: false,
      };
    case REGISTRATION_FAILED_ACTION:
      return {
        ...state,
        errorMessage: action.payload,
        authorized: false,
        modalActive: false,
        userRegister: false,
        userSignIn: false,
      };
    case CHANGE_PASSWORD_CONFIRMED_ACTION:
      return {
        ...state,
        userData: { ...state.userData, ...action.payload },
        authorized: true,
        successMessage: "Change Password is completed",
        modalActive: false,
        userRegister: false,
        userSignIn: false,
      };
    case CHANGE_PASSWORD_FAILED_ACTION:
      return {
        ...state,
        errorMessage: action.payload,
        authorized: true,
        modalActive: false,
        userRegister: false,
        userSignIn: false,
      };
    case SET_MODAL_ACTIVE:
      return {
        ...state,
        modalActive: true,
        userRegister: false,
        userSignIn: false,
      };
    case SIGN_IN_PARAMS_ACTION:
      return {
        ...state,
        modalActive: true,
        signInMenu: true,
      };
    case SET_MODAL_IN_ACTIVE:
      return {
        ...state,
        modalActive: false,
        userRegister: false,
        userSignIn: false,
        signInMenu: false,
        editModal: false,
        addNewProductModal: false,
      };
    case SIGN_IN_MODAL_ACTIVE:
      return {
        ...state,
        userSignIn: true,
        userRegister: false,
        modalActive: true,
      };
    case REGISTER_CLICK_ACTION:
      return {
        ...state,
        userRegister: true,
        userSignIn: false,
        modalActive: true,
      };
    case CHANGE_DATA_ABOUT_USER_CONFIRMED_ACTION:
      return {
        ...state,
        userData: { ...state.userData, ...action.payload },
        modalActive: false,
        userRegister: false,
        userSignIn: false,
      };
    case LOG_OUT_ACTION:
      return {
        ...initialState,
      };
    case SHOW_EDIT_MODAL:
      return {
        ...state,
        editModal: true,
        addNewProductModal: false,
      };
    case SHOW_ADD_NEW_PRODUCT_MODAL:
      return {
        ...state,
        addNewProductModal: true,
        editModal: false,
      };
    default:
      return state;
  }
};
export default authReducer;
