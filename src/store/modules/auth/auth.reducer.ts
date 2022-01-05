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
} from "@/store/modules/auth/auth.constants";

import { initialStateTypes } from "@/store/types";

const initialState: initialStateTypes = {
  userData: {},
  authorized: false,
  errorMessage: "",
  successMessage: "",
  modalActive: true,
  userSignIn: false,
  userRegister: false,
  signInMenu: false,
};
// eslint-disable-next-line default-param-last
const authReducer = (state = initialState, action: unknown) => {
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
    default:
      return state;
  }
};
export default authReducer;
