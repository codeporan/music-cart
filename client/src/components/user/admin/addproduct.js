import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import SelectInput from "../../common/selectInput";
import { addProduct } from "../../../../actions/productactions";
import { getwood } from "../../../../actions/woodactions";
import { getbrand } from "../../../../actions/brandactions";

class AddProduct extends Component {
  state = {
    name: "",
    description: "",
    images: [],
    wood: "",
    brand: "",
    frets: "",
    available: "",
    price: "",
    shipping: "",
    publish: "",
    formSuccess: false,
    formError: false
  };

  submitForm = event => {
    event.preventDefault();
    const formdata = {
      name: this.state.name,
      price: this.state.price,
      description: this.state.description,
      brand: this.state.brand,
      wood: this.state.wood,
      publish: this.state.publish,
      available: this.state.available,
      frets: this.state.frets,
      shipping: this.state.shipping,
      images: this.state.images
    };

    this.props.addProduct(formdata);
    this.setState({
      name: "",
      price: "",
      description: "",
      brand: "",
      wood: "",
      publish: "",
      available: "",
      frets: "",
      shipping: ""
    });
  };
  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  componentDidMount() {
    this.props.getwood();
    this.props.getbrand();
  }

  render() {
    console.log(this.props.brands.brands);
    const publish = [{ key: "yes", value: true }, { key: "no", value: false }];
    const frets = [
      { label: 20, value: 20 },
      { label: 21, value: 21 },
      { label: 22, value: 22 },
      { label: 24, value: 24 }
    ];
    const available = [
      { key: "yes", value: true },
      { key: "no", value: false }
    ];
    const shipping = [{ key: "yes", value: true }, { key: "no", value: false }];
    return (
      <div>
        <form onSubmit={this.submitForm}>
          <div className="block">
            <input
              name="name"
              type="text"
              id={"name"}
              value={this.state.name}
              onChange={this.onChange}
              placeholder="Select name"
            />
          </div>
          <div className="block">
            <input
              name="price"
              type="number"
              id={"price"}
              value={this.state.price}
              onChange={this.onChange}
              placeholder="product price"
            />
          </div>
          <div className="block">
            <textarea
              placeholder="product description"
              name="description"
              value={this.state.description}
              onChange={this.onChange}
            />
          </div>
          <div className="block">
            <select
              name="frets"
              value={this.state.frets}
              onChange={this.onChange}
            >
              <option value="">Select Frets</option>

              {frets
                ? frets.map((item, i) => (
                    <option key={item.label} value={item.value}>
                      {item.value}
                    </option>
                  ))
                : null}
            </select>
          </div>
          <div className="block">
            <select
              name="shipping"
              value={this.state.shipping}
              onChange={this.onChange}
            >
              <option value="">Select shipping</option>

              {shipping
                ? shipping.map(item => (
                    <option key={item.value} value={item.key}>
                      {item.key}
                    </option>
                  ))
                : null}
            </select>
          </div>

          <div className="block">
            <select
              name="available"
              value={this.state.available}
              onChange={this.onChange}
            >
              <option value="">Select available</option>

              {available
                ? available.map(item => (
                    <option key={item.value} value={item.key}>
                      {item.key}
                    </option>
                  ))
                : null}
            </select>
          </div>
          <SelectInput
            placeholder="brand"
            name="brand"
            onChange={this.onChange}
            value={this.state.brand}
            options={this.props.brands.brands}
          />
          <SelectInput
            placeholder="wood"
            name="wood"
            value={this.state.wood}
            onChange={this.onChange}
            options={this.props.woods.woods}
          />

          <div className="block">
            <select
              name="publish"
              value={this.state.publish}
              onChange={this.onChange}
            >
              <option value="">Select publish</option>

              {publish
                ? publish.map(item => (
                    <option key={item.value} value={item.key}>
                      {item.key}
                    </option>
                  ))
                : null}
            </select>
          </div>
          <button onClick={event => this.submitForm(event)}>Add product</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  products: state.products,
  woods: state.woods,
  brands: state.brands
});
const actions = {
  getwood,
  getbrand,
  addProduct
};
export default connect(
  mapStateToProps,
  actions
)(withRouter(AddProduct));
