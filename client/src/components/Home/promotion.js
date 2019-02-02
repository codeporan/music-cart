import React from "react";
import Mybutton from "../common/button";
const promotion = props => {
  const promotion = {
    img: "/images/featured/featured_home_3.jpg",
    lineOne: "Up to 40% Off",
    lineTwo: "In second hand guitars",
    linkTitle: "Shop now",
    linkTo: "/shop"
  };

  const renderPromotion = () =>
    promotion ? (
      <div
        className="home_promotion_img"
        style={{
          background: `url(${promotion.img})`
        }}
      >
        <div className="tag title">{promotion.lineOne}</div>
        <div className="tag low_title">{promotion.lineTwo}</div>
        <div>
          <Mybutton
            type="default"
            title={promotion.linkTitle}
            link={promotion.linkTo}
            addStyles={{
              margin: "10px 0 0 0"
            }}
          />
        </div>
      </div>
    ) : null;

  return <div className="home_promotion">{renderPromotion()} </div>;
};

export default promotion;
