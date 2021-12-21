import { ReactChild, ReactFragment, ReactPortal, Dispatch, SetStateAction } from "react";
export interface DropdownAndCategory {
  id: number;
  link: string;
}
type ReactNode = ReactChild | ReactFragment | ReactPortal | boolean | null | undefined;
export type Dispatcher<S> = Dispatch<SetStateAction<S>>;

export interface ElementsForLogInLogOut {
  changeState:any;
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
export interface ShowModalLocation {
  from: object;
  show: boolean;
}
interface Rating {
  rate: number;
  count: number;
}
export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  date: string;
  rating: Rating;
}

