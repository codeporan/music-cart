import React, { Component } from "react";
import { connect } from "react-redux";
import Slider from "./slider";
import Promotion from "./promotion";
import CardBlock from "./cardBlock";
import {
  getProductBysell,
  getProductsByArrival
} from "../../actions/productactions";
class Home extends Component {
  componentDidMount() {
    this.props.dispatch(getProductBysell());
    this.props.dispatch(getProductsByArrival());
  }
  render() {
    console.log(this.props.products);
    return (
      <div>
        <Slider />
        <Promotion />
        <CardBlock
          list={this.props.products.bySell}
          title="Best selling Guitters"
        />
        <CardBlock
          list={this.props.products.byArrival}
          title="Best Upcomming Guitters"
        />
      </div>
    );
  }
}

const mapstate = state => ({
  products: state.products
});

export default connect(mapstate)(Home);
