import { registrationPostData, signInPostData } from "@/api/signInRegistrationQuery";

import {
  LOG_OUT_ACTION,
  REGISTRATION_CONFIRMED_ACTION,
  REGISTRATION_FAILED_ACTION,
  SIGN_IN_CONFIRMED_ACTION,
  SIGN_IN_FAILED_ACTION,
} from "@/store/authenticate/authConstants/signInRegistrationConstants";
import { Action, Dispatch } from "redux";

export function signInConfirmedAction(data: object) {
  return {
    type: SIGN_IN_CONFIRMED_ACTION,
    payload: data,
  };
}
export function signInFailedAction(message: string) {
  return {
    type: SIGN_IN_FAILED_ACTION,
    payload: message,
  };
}
export function registrationConfirmedAction(data: object) {
  return {
    type: REGISTRATION_CONFIRMED_ACTION,
    payload: data,
  };
}
export function registraionFailedAction(message: string) {
  return {
    type: REGISTRATION_FAILED_ACTION,
    payload: message,
  };
}

export function logOutAction() {
  return {
    type: LOG_OUT_ACTION,
  };
}
export function signInAction(formData: object) {
  return (dispatch: Dispatch<Action>) => {
    signInPostData({ formData })
      .then((res) => {
        if (res.data) {
          dispatch(signInConfirmedAction(res.data));
        } else {
          throw Error();
        }
      })
      .catch((err) => {
        dispatch(signInFailedAction(err));
      });
  };
}

export function registrationAction(formData: object) {
  return (dispatch: Dispatch<Action>) => {
    registrationPostData({ formData })
      .then((res) => {
        if (res.data) {
          dispatch(registrationConfirmedAction(res.data));
        } else {
          throw Error();
        }
      })
      .catch((err) => {
        dispatch(registraionFailedAction(err));
      });
  };
}
