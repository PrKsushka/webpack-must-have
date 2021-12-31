import { ReactChild, ReactFragment, ReactPortal, Dispatch, SetStateAction } from "react";

export interface DropdownAndCategory {
  id: number;
  link: string;
}
type ReactNode = ReactChild | ReactFragment | ReactPortal | boolean | null | undefined;
export type Dispatcher<S> = Dispatch<SetStateAction<S>>;

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

export interface signInRegistraionPostDataTypes {
  formData: object;
}
type ShowModalType = {
  pathname: string;
};
export interface ShowModalLocation {
  from: ShowModalType;
  show: boolean;
}
interface Rating {
  rate: number;
  count: number;
}
export interface TopProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  date: string;
  rating: Rating;
}
export interface dataForm {
  name: string;
  password: string;
}
export interface Product {
  userId: number;
  id: number;
  title: string;
  body: string;
}
