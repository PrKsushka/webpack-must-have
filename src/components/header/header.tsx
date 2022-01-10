import React from "react";
import { useHistory, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import header from "./header.module.scss";
import { links, headerData } from "../../constants/constants";
import SignInModal from "@/components/modal/signInModal/signInModal";
import RegistrationModal from "@/components/modal/registrationModal/registrationModal";
import HeaderNav from "@/components/header/components/headerNav";
import { logOutAction, registerClickAction, signInModalActive } from "@/store/modules/auth/auth.actions";
import { RootState } from "@/main";
import { TopProduct } from "@/types/types";
import cart from "../../assets/images/cart.png";

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
    dispatch(registerClickAction());
  };
  const history = useHistory();
  const logOut = () => {
    dispatch(logOutAction());
    history.push("/");
    window.history.replaceState({}, document.title);
  };
  const productsInCart = useSelector<RootState, Array<object>>((state) => state.products.cart);
  let res: number | undefined = 0;
  if (productsInCart.length !== 0) {
    res = productsInCart.map((el: TopProduct) => el.quantity).reduce((sum, curr) => Number(sum) + Number(curr));
  }
  return (
    <header className={header.main}>
      <Link to={links.home} className={header.logo}>
        Game Store
      </Link>
      <div className={header.wrapper}>
        <HeaderNav headerMenuArr={headerData} root />
        <ul className={header.menu}>
          {authorized ? (
            <>
              <li className={header.buttons}>
                <Link to={links.profile}>{name}</Link>
              </li>
              <li className={header.buttons}>
                <Link to={links.cart}>
                  <img src={cart} alt="cart" />
                  {res}
                </Link>
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
