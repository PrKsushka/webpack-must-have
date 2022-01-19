import { Dispatcher } from "../../../../types/types";

export interface UserDataOrder {
  code: number;
  description: string;
  payment: string;
}
export interface FormForOrderTypes {
  funcForModal: Dispatcher<boolean>;
}
