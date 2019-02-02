import React, { Component } from "react";
import { connect } from "react-redux";

import ProdNfo from "./prodnfo";
import ProdImg from "./proimg";

import {
  getproductDetails,
  clearProductDetail
} from "../../actions/productactions";

import { addtoCart } from "../../actions/authactions";

class Productdetail extends Component {
  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.dispatch(getproductDetails(id)).then(() => {
      if (!this.props.products.prodDetail) {
        this.props.history.push("/");
      }
    });
  }
  componentWillUnmount() {
    this.props.dispatch(clearProductDetail());
  }
  addToCartHandler = id => {
    this.props.dispatch(addtoCart(id));
  };
  render() {
    const { prodDetail } = this.props.products;
    return (
      <div>
        <div className="container">
          {this.props.products.prodDetail ? (
            <div className="product_detail_wrapper">
              <div className="left">
                <div style={{ width: "500px" }}>
                  <ProdImg detail={prodDetail} />
                </div>
              </div>
              <div className="right">
                <ProdNfo
                  addToCart={id => this.addToCartHandler(id)}
                  detail={prodDetail}
                />
              </div>
            </div>
          ) : (
            "Loading"
          )}
        </div>
      </div>
    );
  }
}
const mapstate = state => ({
  products: state.products
});
export default connect(mapstate)(Productdetail);
