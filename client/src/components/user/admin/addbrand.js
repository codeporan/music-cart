import React, { Component } from "react";

import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { addbrand, getbrand } from "../../../../actions/brandactions";

class Addbrands extends Component {
  state = {
    name: ""
  };

  submitForm = e => {
    e.preventDefault();
    const brandata = {
      name: this.state.name
    };
    const existingbrands = this.props.brands.brands;
    this.props.addbrand(brandata, existingbrands, this.props.history);
    this.setState({ name: "" });
  };

  HandleonChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  componentDidMount() {
    this.props.getbrand();
  }
  showCategoryItems = () =>
    this.props.brands.brands
      ? this.props.brands.brands.map((item, i) => (
          <div className="category_item" key={item._id}>
            {item.name}
          </div>
        ))
      : null;
  render() {
    const { loading } = this.props.brands;
    let brandsContent;

    if (loading) {
      brandsContent = <div>sdfs</div>;
    } else {
      brandsContent = (
        <div className="brands_container">{this.showCategoryItems()}</div>
      );
    }
    return (
      <div className="admin_category_wrapper">
        <h1>Brands</h1>
        <div className="admin_two_column">
          <div className="left">{brandsContent} </div>
          <div className="right">
            <form onSubmit={this.submitForm}>
              <div className="block">
                <input
                  name="name"
                  type="name"
                  id={"name"}
                  value={this.state.name}
                  onChange={this.HandleonChange}
                  placeholder="Brand items "
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
  brands: state.brands
});
const actions = {
  addbrand,
  getbrand
};
export default connect(
  mapstate,
  actions
)(withRouter(Addbrands));
