import React, { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import home from "./home.module.scss";
import SearchInput from "@/components/searchInput/searchInput";
import CardItem from "@/components/cardItem/cardItem";
import Category from "@/components/categories/category";
import { ShowModalLocation } from "../../types/logInLogOutCommon.types";
import SignInModal from "../../components/modal/signInModal/signInModal";
import { RootState } from "@/main";
import { StoreState } from "@/store/types";
import { TopProduct } from "@/types/productsCommon.types";
import { getDataAboutProducts } from "@/store/modules/products/products.actions";

const Home: React.FunctionComponent = function () {
  const location = useLocation();
  const dispatch=useDispatch();
  const locationState = location.state as ShowModalLocation;
  const authorized = useSelector<RootState, boolean>((state: StoreState) => state.auth.authorized);
  const queryParams = new URLSearchParams(location.search);
  const signIn = queryParams.get("signIn");
  const history = useHistory();
  if (authorized) {
    window.history.replaceState(null, "", "/");
    if (locationState) {
      history.push({
        pathname: locationState.from.pathname,
      });
    }
  }

  useEffect(() => {
    dispatch(getDataAboutProducts());
  }, []);
  const signInMenu = useSelector<RootState, boolean>((state: StoreState) => state.auth.signInMenu);
  const topProducts=useSelector((state: StoreState)=> state.products.newProducts)

  return (
    <div className={home.homeWrapper}>
      <div className={home.firstBlock}>
        <SearchInput />
      </div>
      <div className={home.blockWrapper}>
        <p className={home.title}>Categories</p>
        <Category />
      </div>
      <div className={home.blockWrapper}>
        <p className={home.title}>New games</p>
        {topProducts.map((elem: TopProduct) => (
          <CardItem key={elem.id} item={elem} />
        ))}
      </div>
      {signIn || signInMenu ? <SignInModal /> : null}
    </div>
  );
};

export default Home;
