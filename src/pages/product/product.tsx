import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/main";
import { dataSortedByAge, dataSortedByGenre, getDataAboutProducts } from "@/store/modules/products/products.actions";
import CardItem from "@/components/cardItem/cardItem";
import { TopProduct } from "../../types/types";
import product from "./product.module.scss";
import InputRadio from "@/components/UI/inputRadioGroup/inputRadioGroup";
import SearchInput from "@/components/searchInput/searchInput";
import usePreloader from "@/hooks/preloaderHook/usePreloader";
import SortAscDesc from "@/components/modules/product/sortAscDesc";

const Product: React.FunctionComponent = function () {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState("Sort");
  const [loader, showLoader, hideloader] = usePreloader();
  const [selectedRadioButton, setSelectedRadioButton] = useState("all");
  useEffect(() => {
    showLoader();
    dispatch(getDataAboutProducts());
    hideloader();
  }, []);
  const products = useSelector<RootState, Array<object>>((state) => state.products.allProducts);
  function getRegistrationTokenFromLocation(pathName: string) {
    return pathName.slice(10);
  }
  const location = useLocation();
  const categoryPath = getRegistrationTokenFromLocation(location.pathname);
  const filtered = () => products.filter((element: TopProduct) => element.category === categoryPath);

  const objectToSendForGenreButtons = {
    selected: selectedRadioButton,
    setSelected: setSelectedRadioButton,
    sortFunc: dataSortedByGenre,
    values: ["all", "simulation", "action", "shooter", "strategy", "fighting"],
  };
  const objectToSendForAgeButtons = {
    selected: selectedRadioButton,
    setSelected: setSelectedRadioButton,
    sortFunc: dataSortedByAge,
    values: ["all", "3+", "6+", "12+", "18+"],
  };

  return (
    <div className={product.wrapper}>
      <div className={product.buttonWrapper}>
        <h3 className={product.title}>{categoryPath}</h3>
        <h3 className={product.title}>Sort</h3>
        <SortAscDesc selected={selected} setSelected={setSelected} />
        <br />
        <div>
          <div className={product.radioButtonWrapper}>
            <h3 className={product.title}>Genres</h3>
            <InputRadio obj={objectToSendForGenreButtons} />
          </div>
          <div className={product.radioButtonWrapper}>
            <h3 className={product.title}>Age</h3>
            <InputRadio obj={objectToSendForAgeButtons} />
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
            : products.map((elem: TopProduct) => <CardItem key={elem.id} item={elem} />)}
        </div>
      </div>
    </div>
  );
};
export default Product;
