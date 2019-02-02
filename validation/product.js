const Validator = require("validator");
const mongoose = require("mongoose");
const isEmpty = require("./isEmpty");

const validateProduct = data => {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.description = !isEmpty(data.description) ? data.description : "";
  data.price = !isEmpty(data.price) ? data.price : "";

  data.shipping = !isEmpty(data.shipping) ? data.shipping : "";
  data.available = !isEmpty(data.available) ? data.available : "";
  data.publish = !isEmpty(data.publish) ? data.publish : "";
  data.brand = !isEmpty(data.brand) ? data.brand : "";
  data.wood = !isEmpty(data.wood) ? data.wood : "";

  if (!Validator.isLength(data.name, { min: 2, max: 100 })) {
    errors.name = "Name must be between 2 and 100 characters";
  }
  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }
  if (Validator.isEmpty(data.price)) {
    errors.price = "Price is required";
  }

  if (!Validator.isLength(data.description, { min: 5, max: 100000 })) {
    errors.description = "Name must be between 5 and 100000 characters";
  }
  if (Validator.isEmpty(data.description)) {
    errors.description = "description field is required";
  }
  if (Validator.isEmpty(data.shipping)) {
    errors.shipping = "shipping must be Boolen";
  }
  if (Validator.isEmpty(data.available)) {
    errors.available = "available must be Boolen";
  }
  if (Validator.isEmpty(data.publish)) {
    errors.publish = "publish  must be Boolen";
  }
  if (!mongoose.Types.ObjectId.isValid(data.brand)) {
    errors.brand = "Brand id is invalid";
  }
  if (!mongoose.Types.ObjectId.isValid(data.wood)) {
    errors.wood = "Wood id is Invalid";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};

module.exports = validateProduct;
