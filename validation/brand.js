const Validator = require("validator");
const isEmpty = require("./isEmpty");
const validatebrand = data => {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";

  if (Validator.isEmpty(data.name)) {
    errors.name = "Brand name is required ";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};

module.exports = validatebrand;
