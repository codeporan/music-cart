import React, { Component } from "react";

import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { addBrand, getBrands } from "../../actions/productactions";
class Addbrands extends Component {
  state = {
    name: "",
    succeserror: true
  };

  submitForm = e => {
    e.preventDefault();
    const brandata = {
      name: this.state.name
    };
    const existingbrands = this.props.products.brands;
    this.props.addBrand(brandata, existingbrands, this.props.history);
    this.setState({ name: "" });
  };

  HandleonChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  componentDidMount() {
    this.props.getBrands();
  }
  showCategoryItems = () =>
    this.props.products.brands
      ? this.props.products.brands.map((item, i) => (
          <div className="category_item" key={item._id}>
            {item.name}
          </div>
        ))
      : null;
  render() {
    return (
      <div className="admin_category_wrapper">
        <h1>Brand</h1>
        <div className="admin_two_column">
          <div className="left">
            <div className="brands_container">{this.showCategoryItems()}</div>
          </div>
          <div className="right">
            <form onSubmit={this.submitForm}>
              <div className="block">
                <input
                  name="name"
                  type="name"
                  value={this.state.name}
                  onChange={this.HandleonChange}
                  placeholder="brand items "
                />
              </div>
              <button onClick={event => this.submitForm(event)}>
                Add brand
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapstate = state => ({
  products: state.products
});

export default connect(
  mapstate,
  { addBrand, getBrands }
)(withRouter(Addbrands));
