import React from "react";
import Header from "../header/header";
import Footer from "../footer/footer";
import { ElementsForLogInLogOut } from "../../types/types";

const Layout: React.FunctionComponent<ElementsForLogInLogOut> = function ({
  controllElements,
  modalActive,
  setModalActive,
  authorized,
  setAuthorizedInfo,
  userName,
  setUserName,
  children,
}) {
  return (
    <div>
      <Header
        controllModalHeader={controllElements}
        modalActive={modalActive}
        setModalActive={setModalActive}
        checkAuthorized={authorized}
        setCheckAuthorized={setAuthorizedInfo}
        userName={userName}
        setUserName={setUserName}
      />
      {children}
      <Footer />
    </div>
  );
};
export default Layout;
