import React, { Component } from "react";
import CollapseCheckbox from "./CollapseCheckbox";
import CollapseRadio from "./RadioCheckbox";
import { frets, price } from "./staticCategory";
import LoadmoreCards from "./LoadmoreCards";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faBars from "@fortawesome/fontawesome-free-solid/faBars";
import faTh from "@fortawesome/fontawesome-free-solid/faTh";

import {
  getProductsToShop,
  getBrands,
  getWoods
} from "../../actions/productactions";
import { connect } from "react-redux";
class Shop extends Component {
  state = {
    grid: "",
    limit: 6,
    skip: 0,
    filters: {
      brand: [],
      frets: [],
      wood: [],
      price: []
    }
  };
  componentDidMount() {
    this.props.dispatch(getBrands());
    this.props.dispatch(getWoods());
    // pass arguments  skip = 0, limit= 6 and filters get all products
    // but not greater than six
    this.props.dispatch(
      getProductsToShop(this.state.skip, this.state.limit, this.state.filters)
    );
  }
  handlePrice = value => {
    const data = price;
    let array = [];

    for (let key in data) {
      if (data[key]._id === parseInt(value, 10)) {
        array = data[key].array;
      }
    }
    return array;
  };

  handleFilters = (filters, category) => {
    const newFilters = { ...this.state.filters };
    newFilters[category] = filters;

    if (category === "price") {
      let priceValues = this.handlePrice(filters);
      newFilters[category] = priceValues;
    }
    this.showFilteredResults(newFilters);
    this.setState({
      filters: newFilters
    });
  };

  showFilteredResults = filters => {
    this.props
      .dispatch(getProductsToShop(0, this.state.limit, filters))
      .then(() => {
        this.setState({
          skip: 0
        });
      });
  };

  loadMoreCards = () => {
    let skip = this.state.skip + this.state.limit;

    this.props
      .dispatch(
        getProductsToShop(
          skip,
          this.state.limit,
          this.state.filters,
          this.props.products.toShop
        )
      )
      .then(() => {
        this.setState({
          skip
        });
      });
  };

  handleGrid = () => {
    this.setState({
      grid: !this.state.grid ? "grid_bars" : ""
    });
  };

  render() {
    console.log(this.state.filters);
    const { brands, woods } = this.props.products;
    console.log(brands);
    return (
      <div>
        <div className="container">
          <h1>Browse Products</h1>

          <div className="shop_wrapper">
            <div className="left">
              <CollapseCheckbox
                initState={true}
                title="Brands"
                list={brands}
                handleFilters={filters => this.handleFilters(filters, "brand")}
              />
              <CollapseCheckbox
                initState={false}
                title="Frets"
                list={frets}
                handleFilters={filters => this.handleFilters(filters, "frets")}
              />
              <CollapseCheckbox
                initState={false}
                title="Wood"
                list={woods}
                handleFilters={filters => this.handleFilters(filters, "wood")}
              />
              <CollapseRadio
                initState={true}
                title="Price"
                list={price}
                handleFilters={filters => this.handleFilters(filters, "price")}
              />
            </div>
            <div className="right">
              <div className="shop_options">
                <div className="shop_grids clear">
                  <div
                    className={`grid_btn ${this.state.grid ? "" : "active"}`}
                    onClick={() => this.handleGrid()}
                  >
                    <FontAwesomeIcon icon={faTh} />
                  </div>
                  <div
                    className={`grid_btn ${!this.state.grid ? "" : "active"}`}
                    onClick={() => this.handleGrid()}
                  >
                    <FontAwesomeIcon icon={faBars} />
                  </div>
                </div>
              </div>
              <div style={{ clear: "both" }}>
                <LoadmoreCards
                  grid={this.state.grid}
                  limit={this.state.limit}
                  size={this.props.products.toShopSize}
                  products={this.props.products.toShop}
                  loadMore={() => this.loadMoreCards()}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapstate = state => ({
  products: state.products
});

export default connect(mapstate)(Shop);
