import authReducer from "@/store/modules/auth/auth.reducer";
import { applyMiddleware, createStore, combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import composeEnhancer from "@/store/d";
import productReducer from "@/store/modules/products/products.reducer";


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
