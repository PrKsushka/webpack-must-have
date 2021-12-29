import { authReducer } from "@/store/authenticate/authReducer";
import { applyMiddleware, compose, createStore, combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
interface initialStateTypes {
  userData: object;
  authorized: boolean;
  errorMessage: string;
  successMessage: string;
  modalActive: boolean;
  userSignIn: boolean;
  userRegister: boolean;
  signInMenu: boolean;
}

export const initialState: initialStateTypes = {
  userData: {},
  authorized: false,
  errorMessage: "",
  successMessage: "",
  modalActive: true,
  userSignIn: false,
  userRegister: false,
  signInMenu: false,
};
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const persistConfig = {
  key: "token",
  storage,
};
const reducer = combineReducers({
  auth: authReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);
const store = createStore(persistedReducer, composeEnhancer(applyMiddleware(thunk)));
const persistor = persistStore(store);
export default { store, persistor };
