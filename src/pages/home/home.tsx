import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import home from "./home.module.scss";
import SearchInput from "@/components/searchInput/searchInput";
import CardItem from "@/components/cardItem/cardItem";
import Category from "@/components/categories/category";
import { ShowModalLocation, TopProduct } from "../../types/types";
import SignInModal from "../../components/modal/signInModal/signInModal";
import { RootState } from "@/main";

const Home: React.FunctionComponent = function () {
  const [topProducts, setTopProducts] = useState<Array<TopProduct>>([]);
  const location = useLocation();
  const state = location.state as ShowModalLocation;
  const authorized = useSelector<RootState, boolean>((state) => state.auth.authorized);
  const queryParams = new URLSearchParams(location.search);
  const signIn = queryParams.get("signIn");

  const history = useHistory();
  if (authorized) {
    window.history.replaceState(null, "", "/");
    if (state) {
      console.log(state)
      history.push({
        pathname: state.from.pathname,
      });
    }
  }

  useEffect(() => {
    axios.get("api/getTopProducts").then((res) => {
      setTopProducts((prevState) => [...prevState, ...res.data.slice(0, 3)]);
    });
  }, []);

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
      {signIn || state?.show ? <SignInModal /> : ""}
    </div>
  );
};

export default Home;
