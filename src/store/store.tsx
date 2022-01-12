import authReducer from "@/store/modules/auth/auth.reducer";
import { applyMiddleware, createStore, combineReducers, compose } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import productReducer from "@/store/modules/products/products.reducer";

// @ts-ignore
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const persistConfig = {
  key: "token",
  storage,
};
const reducer = combineReducers({
  auth: authReducer,
  products: productReducer
});

const persistedReducer = persistReducer(persistConfig, reducer);
const store = createStore(persistedReducer, composeEnhancer(applyMiddleware(thunk)));
const persistor = persistStore(store);
export default { store, persistor };
