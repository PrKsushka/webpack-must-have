import React from "react";
import { useDispatch } from "react-redux";
import card from "./cardItem.module.scss";
import { CardProps } from "./cardItem.types";
import StarRating from "@/components/starRating/starRating";
import { addToCartAction } from "@/store/modules/products/products.actions";

const CardItem: React.FunctionComponent<CardProps> = function ({
  item: { id, image, title, price, rating, description },
}) {
  const dispatch = useDispatch();
  const addToCart = (el: number | undefined) => {
    dispatch(addToCartAction(el));
  };
  return (
    <div id="block" className={card.block}>
      <div className={card.theCard}>
        <div className={card.frontSide}>
          <div className={card.cardPicture} style={{ backgroundImage: `url(${image})` }} />
          <div className={card.infoWrapper}>
            <p className={card.title}>{title}</p>
            <p className={card.price}>{price}$</p>
            <StarRating rating={rating?.rate} />
          </div>
        </div>

        <div className={card.backSide}>
          <p>{description}</p>
          <button className={card.addToCart} onClick={() => addToCart(id)}>
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};
export default CardItem;
