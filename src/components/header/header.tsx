import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import header from "./header.module.scss";
import { links, headerData } from "../../constants/constants";
import SignIn from "@/pages/signIn/signIn";
import Registration from "@/pages/registration/registration";
import HeaderList from "@/components/header/headerList";
import localStorageService from "@/localStorageService/localStorageService";
import { logOutAction } from "@/redux/actions/authActions";
import { RootState } from "@/main";

const Header: React.FunctionComponent = function () {
  const [userRegister, setRegister] = useState<boolean>(false);
  const [userSignIn, setCheckSignIn] = useState<boolean>(false);

  const dispatch = useDispatch();
  const authorized = useSelector<RootState, boolean>((state) => state.auth.authorized);
  const name = useSelector<RootState, string>((state) => state.auth.userData.name);

  const signIn = () => {
    setCheckSignIn(true);
  };

  const register = () => {
    setRegister(true);
    setCheckSignIn(false);
  };
  const history = useHistory();
  const logOut = () => {
    dispatch(logOutAction());
    setRegister(false);
    setCheckSignIn(false);
    localStorageService.removeToken();
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
              <li className={header.buttons}>{name}</li>
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
        {userRegister ? <Registration /> : ""}
      </div>
      {userSignIn ? <SignIn /> : ""}
    </header>
  );
};
export default Header;
