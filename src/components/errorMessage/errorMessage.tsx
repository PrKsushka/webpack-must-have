import React, { ReactElement } from "react";
import err from "./errorMessage.module.css";

interface ErrorMessage {
  children: ReactElement;
}
const ErrorMessage: React.FunctionComponent<ErrorMessage> = function ({ children }) {
  return <div className={err.error}>{children}</div>;
};

export default ErrorMessage;
