import React from "react";
import card from "./cardItem.module.scss";
import { CardProps } from "./cardItem.types";

const CardItem: React.FunctionComponent<CardProps> = function ({
  item: {
    image,
    title,
    price,
    rating,
    description,
  },
}) {
  return (
    <div id="block" className={card.block}>
      <div className={card.theCard}>
        <div className={card.frontSide}>
          <div className={card.cardPicture} style={{ backgroundImage: `url(${image})` }} />
          <div className={card.infoWrapper}>
            <p className={card.title}>{title}</p>
            <p className={card.price}>{price}$</p>
            <p className={card.rating}>Rating {rating?.rate}</p>
          </div>
        </div>

        <div className={card.backSide}>
          <p>{description}</p>
          <button className={card.addToCart}>Add to cart</button>
        </div>
      </div>
    </div>
  );
};
export default CardItem;
