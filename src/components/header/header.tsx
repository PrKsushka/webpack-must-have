import React from "react";
import { useHistory, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import header from "./header.module.scss";
import { links, headerData } from "../../constants/routeMenuConstant";
import SignInModal from "@/components/modal/signInModal/signInModal";
import RegistrationModal from "@/components/modal/registrationModal/registrationModal";
import HeaderNav from "@/components/header/components/headerNav";
import { logOutAction, registerClickAction, signInModalActive } from "@/store/modules/auth/auth.actions";
import { RootState } from "@/main";
import cart from "../../assets/images/cart.png";
import { countOfProductsInShoppingCart } from "@/store/modules/products/product.selectors";
import { StoreState } from "@/store/types";
import { logOutFromCartAction } from "@/store/modules/products/products.actions";

const Header: React.FunctionComponent = function () {
  const dispatch = useDispatch();
  const authorized = useSelector<RootState, boolean>((state: StoreState) => state.auth.authorized);
  const name = useSelector<RootState, string>((state: StoreState) => state.auth.userData.name);
  const userSignIn = useSelector<RootState, boolean>((state: StoreState) => state.auth.userSignIn);
  const userRegister = useSelector<RootState, boolean>((state: StoreState) => state.auth.userRegister);
  const count = useSelector<RootState, number>((state: StoreState) => countOfProductsInShoppingCart(state));

  const signIn = () => {
    dispatch(signInModalActive());
  };

  const register = () => {
    dispatch(registerClickAction());
  };
  const history = useHistory();
  const logOut = () => {
    dispatch(logOutAction());
    dispatch(logOutFromCartAction());
    history.push("/");
    window.history.replaceState({}, document.title);
  };



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
                  {count}
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
