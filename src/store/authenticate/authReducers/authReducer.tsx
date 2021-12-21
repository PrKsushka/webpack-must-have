import {
  LOG_OUT_ACTION,
  REGISTRATION_CONFIRMED_ACTION,
  REGISTRATION_FAILED_ACTION,
  SIGN_IN_CONFIRMED_ACTION,
  SIGN_IN_FAILED_ACTION,
} from "@/store/authenticate/authConstants/signInRegistrationConstants";

interface initialStateTypes {
  userData: object;
  authorized: boolean;
  errorMessage: string;
  successMessage: string;
  modalActive: boolean;
}

const initialState: initialStateTypes = {
  userData: {},
  authorized: false,
  errorMessage: "",
  successMessage: "",
  modalActive: true,
};
export const authReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SIGN_IN_CONFIRMED_ACTION:
      return {
        ...state,
        userData: action.payload,
        authorized: true,
        errorMessage: "",
        successMessage: "Sign In is completed",
        modalActive: false,
      };
    case SIGN_IN_FAILED_ACTION:
      return {
        ...state,
        errorMessage: action.payload,
        authorized: false,
        modalActive: false,
      };
    case REGISTRATION_CONFIRMED_ACTION:
      return {
        ...state,
        userData: action.payload,
        authorized: true,
        successMessage: "Registration is completed",
        modalActive: false,
      };
    case REGISTRATION_FAILED_ACTION:
      return {
        ...state,
        errorMessage: action.payload,
        authorized: false,
        modalActive: false,
      };
    case LOG_OUT_ACTION:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};
