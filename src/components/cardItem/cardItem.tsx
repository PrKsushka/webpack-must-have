import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import card from "./cardItem.module.scss";
import { CardProps } from "./cardItem.types";
import StarRating from "@/components/starRating/starRating";
import { addToCartAction } from "@/store/modules/products/products.actions";
import { StoreState } from "@/store/types";
import EditModal from "@/components/modal/editModal/editModal";
import { showEditModal, signInParamsAction } from "@/store/modules/auth/auth.actions";

const CardItem: React.FunctionComponent<CardProps> = function ({ item }) {
  const dispatch = useDispatch();
  const auth = useSelector((state: StoreState) => state.auth.authorized);
  const addToCart = () => {
    if (item.id !== undefined && auth) {
      dispatch(addToCartAction(item.id));
    }
    if (!auth) {
      dispatch(signInParamsAction());
    }
  };
  const [openModal, setModalOpen] = useState(false);
  const activeEditModal = useSelector((state: StoreState) => state.auth.editModal);
  const edit = () => {
    dispatch(showEditModal());
    setModalOpen((prevState) => !prevState);
  };
  const userName = useSelector((state: StoreState) => state.auth.userData.name);

  return (
    <div id="block" className={card.block}>
      <div className={card.theCard}>
        <div className={card.frontSide}>
          <div className={card.cardPicture} style={{ backgroundImage: `url(${item.image})` }} />
          <div className={card.infoWrapper}>
            <p className={card.title}>{item.title}</p>
            <p className={card.smallText}>{item.price}$</p>
            <StarRating rating={item.rating?.rate} />
          </div>
        </div>

        <div className={card.backSide}>
          <p className={card.title}>{item.description}</p>
          <p className={card.smallText}>{item.category}</p>
          <p className={card.smallText}>{item.age}</p>
          <button className={card.addToCart} onClick={addToCart}>
            Add to cart
          </button>
          {userName && userName.toLowerCase() === "admin" ? (
            <button className={card.addToCart} onClick={edit}>
              Edit
            </button>
          ) : null}
        </div>
      </div>
      {activeEditModal && openModal ? <EditModal obj={item} openModal={setModalOpen} /> : null}
    </div>
  );
};
export default CardItem;
