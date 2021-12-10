import React from "react";
import ReactDom from "react-dom";
import "./styles/main.scss";
import App from "./App";
import { createStore, compose, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { reducer } from "./redux/store";
import thunk from "redux-thunk";
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const newStore = createStore(reducer, composeEnhancer(applyMiddleware(thunk)));
export type RootState = ReturnType<typeof newStore.getState>;
export type AppDispatch = typeof newStore.dispatch;

ReactDom.render(
  <Provider store={newStore}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById("app")
);
