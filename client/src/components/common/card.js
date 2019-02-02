import React, { Component } from "react";
import MyButton from "./button";
import { addtoCart } from "../../actions/authactions";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faShoppingBag from "@fortawesome/fontawesome-free-solid/faShoppingBag";
import { connect } from "react-redux";
class Card extends Component {
  renderCardImage = images => {
    if (images.length > 0) {
      return images[0].url;
    } else {
      return "/images/image_not_availble.png";
    }
  };
  onClick = id => () => {
    this.props.dispatch(addtoCart(id));
  };
  render() {
    const card = this.props;
    return (
      <div className={`card_item_wrapper ${card.grid}`}>
        <div
          className="image"
          style={{
            background: `url(${this.renderCardImage(card.images)}) no-repeat`
          }}
        />
        <div className="action_container">
          <div className="tags">
            {/* <div className="brand">{props.brand.name}</div> */}
            <div className="name">{card.name}</div>
            <div className="name">${card.price}</div>
          </div>

          {card.grid ? (
            <div className="description">
              <p>{card.description}</p>
            </div>
          ) : null}
          <div className="actions">
            <div className="button_wrapp">
              <MyButton
                type="default"
                altClass="card_link"
                title="View product"
                link={`/product/${card._id}`}
                addStyles={{
                  margin: "10px 0 0 0"
                }}
              />
            </div>
            <div className="button_wrapp">
              <div className="bag_link" onClick={this.onClick(card._id)}>
                <FontAwesomeIcon icon={faShoppingBag} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const Mapsstate = state => ({
  products: state.products
});
export default connect(Mapsstate)(Card);
