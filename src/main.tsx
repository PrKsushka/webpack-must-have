import React from "react";
import ReactDom from "react-dom";
import "./styles/main.scss";
import App from "./App";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import confStore from "./store/configureStore";
export type RootState = ReturnType<typeof confStore.store.getState>;
export type AppDispatch = typeof confStore.store.dispatch;

ReactDom.render(
  <Provider store={confStore.store}>
    <PersistGate persistor={confStore.persistor} loading={null}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </PersistGate>
  </Provider>,
  document.getElementById("app")
);
