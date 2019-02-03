import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import SelectInput from "../common/selectInput";
import CustomSelectInput from "../common/CustomSelect";
import { addProduct, getBrands, getWoods } from "../../actions/productactions";
import TextFieldGroup from "../common/TextFieldGroup";
import TextFieldAreaGroup from "../common/TextFieldAreaGroup";
import FileUpload from "./addfileupload";
class AddProduct extends Component {
  state = {
    name: "",
    description: "",
    images: {
      value: [],
      validation: { required: false },
      valid: true,
      touched: false,
      validationMessage: "",
      showLabel: false
    },
    wood: "",
    brand: "",
    frets: "",
    available: "",
    price: "",
    shipping: "",
    publish: "",
    formSuccess: false,
    formError: false,
    errors: {}
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }
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
  // imagesHandler = img => {
  //   const newformdata = {
  //     ...this.state.images
  //   };
  //   newformdata["images"].value = img;
  //   newformdata["images"].valid = true;
  //   this.setState({
  //     images: newformdata
  //   });
  // };
  componentDidMount() {
    this.props.getBrands();
    this.props.getWoods();
  }

  render() {
    const { brands, woods } = this.props.products;
    const { errors } = this.state;
    console.log(this.props.products);
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
        <h1>Add Product</h1>
        <form onSubmit={this.submitForm}>
          {/* <FileUpload imagesHandler={images => this.imagesHandler(images)} /> */}
          <TextFieldGroup
            type="text"
            name="name"
            placeholder="Product name"
            onChange={this.onChange}
            value={this.state.name}
            error={errors.name}
          />
          <TextFieldGroup
            name="price"
            type="number"
            id={"price"}
            value={this.state.price}
            onChange={this.onChange}
            placeholder="product price"
            error={errors.price}
          />
          <TextFieldAreaGroup
            placeholder="product description"
            name="description"
            value={this.state.description}
            onChange={this.onChange}
            error={errors.description}
          />
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

          <CustomSelectInput
            placeholder="Shippping"
            error={errors.shipping}
            name="shipping"
            onChange={this.onChange}
            value={this.state.shipping}
            options={shipping}
          />
          <CustomSelectInput
            placeholder="available"
            name="available"
            onChange={this.onChange}
            error={errors.available}
            value={this.state.available}
            options={available}
          />
          <SelectInput
            placeholder="brand"
            name="brand"
            onChange={this.onChange}
            value={this.state.brand}
            options={brands}
          />
          <SelectInput
            placeholder="wood"
            name="wood"
            value={this.state.wood}
            onChange={this.onChange}
            options={woods}
          />
          <CustomSelectInput
            placeholder="Shippping"
            error={errors.publish}
            name="publish"
            onChange={this.onChange}
            value={this.state.publish}
            options={publish}
          />

          <button onClick={event => this.submitForm(event)}>Add product</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  products: state.products,
  errors: state.errors
});
const actions = {
  getBrands,
  getWoods,
  addProduct
};
export default connect(
  mapStateToProps,
  actions
)(withRouter(AddProduct));
