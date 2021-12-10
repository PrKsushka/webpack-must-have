import { combineReducers } from "redux";
import { authReducer } from "@/redux/reducers/authReducer";

export const reducer = combineReducers({
  auth: authReducer,
});
