import React, { useState, Suspense, useMemo, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/main";
import { dataSortedByAge, dataSortedByGenre, getDataAboutProducts } from "@/store/modules/products/products.actions";
import { TopProduct } from "../../types/productsCommon.types";
import product from "./product.module.scss";
import InputRadioGroup from "@/components/UI/inputRadioGroup/inputRadioGroup";
import SearchInput from "@/components/searchInput/searchInput";
import SortAscDesc from "@/components/modules/product/sortAscDesc";
import { StoreState } from "@/store/types";
import { showAddNewProductModal } from "@/store/modules/auth/auth.actions";
import AddNewProductModal from "@/components/modal/addNewProductModal/addNewProductModal";
import Preloader from "@/components/UI/preloader/preloader";
import toggleBodyOverflow from "@/utils/overflow";

const CardItem = React.lazy(() => import("@/components/cardItem/cardItem"));

const Product: React.FunctionComponent = function () {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState("Products");
  const [selectedRadioButton, setSelectedRadioButton] = useState("all");

  const products = useSelector<RootState, Array<object>>((state: StoreState) => state.products.allProducts);
  const userName = useSelector((state: StoreState) => state.auth.userData.name);
  const activeAddProdModal = useSelector((state: StoreState) => state.auth.addNewProductModal);

  useEffect(() => {
    dispatch(getDataAboutProducts());
  }, []);
  const addProduct = () => {
    toggleBodyOverflow();
    dispatch(showAddNewProductModal());
  };
  function getRegistrationTokenFromLocation(pathName: string) {
    return pathName.slice(10);
  }
  const location = useLocation();
  const categoryPath = useMemo(() => getRegistrationTokenFromLocation(location.pathname), [location.pathname]);
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
            <InputRadioGroup obj={objectToSendForGenreButtons} />
          </div>
          <div className={product.radioButtonWrapper}>
            <h3 className={product.title}>Age</h3>
            <InputRadioGroup obj={objectToSendForAgeButtons} />
          </div>
        </div>
      </div>
      <div className={product.column}>
        <div className={product.searchInput}>
          <SearchInput />
          {userName.toLowerCase() === "admin" ? (
            <button className={product.addButton} type="button" onClick={addProduct}>
              Add new position
            </button>
          ) : null}
        </div>
        <Suspense fallback={<Preloader />}>
          <div className={product.productWrapper}>
            {location.pathname !== "/products"
              ? filtered().map((elem: TopProduct) => <CardItem key={elem.id} item={elem} />)
              : products.map((elem: TopProduct) => <CardItem key={elem.id} item={elem} />)}
          </div>
        </Suspense>
      </div>
      {activeAddProdModal === true ? <AddNewProductModal /> : null}
    </div>
  );
};
export default Product;
