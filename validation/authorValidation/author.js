const Validator = require("validator");
const isEmpty = require("./isEmpty");

const validateauthor = data => {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";

  if (Validator.isEmpty(data.name)) {
    errors.name = "wood name is required ";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};

module.exports = validateauthor;
