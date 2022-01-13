import { Dispatcher, ReactNode } from "./types";

export interface ElementsForLogInLogOut {
  changeState: unknown;
  setAuthorized: Dispatcher<boolean>;
  modalActive: boolean;
  setModalActive: Dispatcher<boolean>;
  authorized: boolean;
  children?: ReactNode;
  setUserName: Dispatcher<string>;
  userName: string;
}

type ShowModalType = {
  pathname: string;
};
export interface ShowModalLocation {
  from: ShowModalType;
  show: boolean;
}
export interface signInRegistraionPostDataTypes {
  formData: object;
}
