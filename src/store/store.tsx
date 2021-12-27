import { combineReducers } from "redux";
import { authReducer } from "@/store/authenticate/authReducers/authReducer";

export const reducer = combineReducers({
  auth: authReducer,
});
