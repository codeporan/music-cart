import React, { Component } from "react";

import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getWoods, addWood } from "../../actions/productactions";
class Addwood extends Component {
  state = {
    name: ""
  };

  submitForm = e => {
    e.preventDefault();
    const woodData = {
      name: this.state.name
    };
    const existingwoods = this.props.products.woods;
    this.props.addWood(woodData, existingwoods, this.props.history);
    // this.props.addwood(woodData, existingwoods);
    this.setState({ name: "" });
  };

  HandleonChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  componentDidMount() {
    this.props.getWoods();
  }
  showCategoryItems = () =>
    this.props.products.woods
      ? this.props.products.woods.map((item, i) => (
          <div className="category_item" key={item._id}>
            {item.name}
          </div>
        ))
      : null;
  render() {
    return (
      <div className="admin_category_wrapper">
        <h1>Brands</h1>
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
                  placeholder="wood items "
                />
              </div>
              <button onClick={event => this.submitForm(event)}>
                Add wood
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
  { addWood, getWoods }
)(withRouter(Addwood));
