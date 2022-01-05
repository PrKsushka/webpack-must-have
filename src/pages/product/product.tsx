import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/main";
import {
  dataSortedByAge,
  dataSortedByGenre,
  dataSortedByPrice,
  dataSortedByRating,
  getDataAboutProducts,
} from "@/store/modules/products/products.actions";
import CardItem from "@/components/cardItem/cardItem";
import { TopProduct } from "../../types/types";
import product from "./product.module.scss";
import InputRadio from "@/components/UI/inputRadio/inputRadio";
import SearchInput from "@/components/searchInput/searchInput";
import usePreloader from "@/hooks/preloaderHook/usePreloader";
const Product: React.FunctionComponent = function () {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState("Sort");
  const [loader, showLoader, hideloader] = usePreloader();

  useEffect(() => {
    showLoader();
    dispatch(getDataAboutProducts());
    hideloader();
  }, []);
  const products = useSelector<RootState, Array<object>>((state) => state.products.allProducts);
  const p = products;
  function getRegistrationTokenFromLocation(pathName: string) {
    return pathName.slice(10);
  }
  const location = useLocation();
  const categoryPath = getRegistrationTokenFromLocation(location.pathname);
  const filtered = () => products.filter((element: TopProduct) => element.category === categoryPath);
  const changeSelect = (e: { target: { value: React.SetStateAction<string> } }) => {
    setSelected(e.target.value);
    const asc = "asc";
    const desc = "desc";
    if (e.target.value === "Rating ascending") {
      dispatch(dataSortedByRating(asc));
    } else if (e.target.value === "Rating descending") {
      dispatch(dataSortedByRating(desc));
    } else if (e.target.value === "Price ascending") {
      dispatch(dataSortedByPrice(asc));
    } else if (e.target.value === "Price descending") {
      dispatch(dataSortedByPrice(desc));
    }
  };
  const [selectedRadioGenreButton, setSelectedRadioGenreButton] = useState("all");
  const objectToSendForGenreButtons = {
    selected: selectedRadioGenreButton,
    setSelected: setSelectedRadioGenreButton,
    sortFunc: dataSortedByGenre,
  };
  const objectToSendForAgeButtons = {
    selected: selectedRadioGenreButton,
    setSelected: setSelectedRadioGenreButton,
    sortFunc: dataSortedByAge,
  };
  return (
    <div className={product.wrapper}>
      <div className={product.buttonWrapper}>
        <h3 className={product.title}>{categoryPath}</h3>
        <h3 className={product.title}>Sort</h3>
        <select value={selected} onChange={changeSelect} className={product.selected}>
          <option defaultValue="" selected hidden>
            Choose
          </option>
          <option>Rating ascending</option>
          <option>Rating descending</option>
          <option>Price ascending</option>
          <option>Price descending</option>
        </select>
        <br />
        <div>
          <div className={product.radioButtonWrapper}>
            <h3 className={product.title}>Genres</h3>
            <InputRadio val="all" text="All genres" obj={objectToSendForGenreButtons} />
            <InputRadio val="simulation" text="Simulation" obj={objectToSendForGenreButtons} />
            <InputRadio val="action" text="Action" obj={objectToSendForGenreButtons} />
            <InputRadio val="shooter" text="Shooter" obj={objectToSendForGenreButtons} />
            <InputRadio val="strategy" text="Strategy" obj={objectToSendForGenreButtons} />
            <InputRadio val="fighting" text="Fighting" obj={objectToSendForGenreButtons} />
          </div>
          <div className={product.radioButtonWrapper}>
            <h3 className={product.title}>Age</h3>
            <InputRadio val="all" text="All ages" obj={objectToSendForAgeButtons} />
            <InputRadio val="3+" text="3+" obj={objectToSendForAgeButtons} />
            <InputRadio val="6+" text="6+" obj={objectToSendForAgeButtons} />
            <InputRadio val="12+" text="12+" obj={objectToSendForAgeButtons} />
            <InputRadio val="18+" text="18+" obj={objectToSendForAgeButtons} />
          </div>
        </div>
      </div>
      <div className={product.column}>
        <div className={product.searchInput}>
          <SearchInput />
        </div>
        <div className={product.productWrapper}>
          {loader}
          {location.pathname !== "/products"
            ? filtered().map((elem: TopProduct) => <CardItem key={elem.id} item={elem} />)
            : p.map((elem: TopProduct) => <CardItem key={elem.id} item={elem} />)}
        </div>
      </div>
    </div>
  );
};
export default Product;
