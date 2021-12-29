import React from "react";
import { useHistory, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import header from "./header.module.scss";
import { links, headerData } from "../../constants/constants";
import SignInModal from "@/components/modal/signInModal/signInModal";
import RegistrationModal from "@/components/modal/registrationModal/registrationModal";
import HeaderList from "@/components/header/headerList";
import { logOutAction, registerModalActive, signInModalActive } from "@/store/authenticate/authActions";
import { RootState } from "@/main";

const Header: React.FunctionComponent = function () {
  const dispatch = useDispatch();
  const authorized = useSelector<RootState, boolean>((state) => state.auth.authorized);
  const name = useSelector<RootState, string>((state) => state.auth.userData.name);
  const userSignIn = useSelector<RootState, boolean>((state) => state.auth.userSignIn);
  const userRegister = useSelector<RootState, boolean>((state) => state.auth.userRegister);
  const signIn = () => {
    dispatch(signInModalActive());
  };

  const register = () => {
    dispatch(registerModalActive());
  };
  const history = useHistory();
  const logOut = () => {
    dispatch(logOutAction());
    history.push("/");
    window.history.replaceState({}, document.title);
  };
  return (
    <header className={header.main}>
      <Link to={links.home} className={header.logo}>
        Game Store
      </Link>
      <div className={header.wrapper}>
        <HeaderList headerMenuArr={headerData} root />
        <ul className={header.menu}>
          {authorized ? (
            <>
              <li className={header.buttons}>
                <Link to={links.profile}>{name}</Link>
              </li>
              <li className={header.buttons} onClick={logOut}>
                Log Out
              </li>
            </>
          ) : (
            <>
              <li className={header.buttons} onClick={signIn}>
                Sign In
              </li>
              <li className={header.buttons} onClick={register}>
                Registration
              </li>
            </>
          )}
        </ul>
        {userRegister ? <RegistrationModal /> : null}
        {userSignIn ? <SignInModal /> : null}
      </div>
    </header>
  );
};
export default Header;
