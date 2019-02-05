import React, { Component } from "react";
import axios from "axios";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faBars from "@fortawesome/fontawesome-free-solid/faBars";
import faTh from "@fortawesome/fontawesome-free-solid/faTh";

import { getBrands } from "../../actions/productactions";
import { connect } from "react-redux";
class Shop extends Component {
  state = {
    displayCategory: "all",
    products: this.props.products,
    productCategories: this.props.products.brands
  };

  componentDidMount() {
    this.props.dispatch(getBrands());
  }

  render() {
    return (
      <div>
        <div className="container">
          <h1>Browse Products</h1>
        </div>
      </div>
    );
  }
}
const mapstate = state => ({
  products: state.products
});

export default connect(mapstate)(Shop);
