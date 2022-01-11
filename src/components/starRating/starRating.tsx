import React from "react";
import s from "./starRating.module.scss";
interface StarRating {
  rating?: number;
}
const StarRating: React.FunctionComponent<StarRating> = function ({
  rating,
}) {
  const count = 5;
  const inactiveColor = "#ddd";
  const size = 24;
  const activeColor = "#fff204";
  const stars = Array.from({ length: count }, () => "🟊");
  return (
    <div className={s.star}>
      {stars.map((el, index) => {
        let style = (rating !== undefined) && (index +1 <= Math.round(rating)) ? activeColor : inactiveColor
        return (
          <span key={index} style={{ color: style, fontSize: size }}>
            {el}
          </span>
        );
      })}
      {rating}
    </div>
  );
};
export default StarRating;
