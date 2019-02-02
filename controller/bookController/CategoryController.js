const mongoose = require("mongoose");
const Category = mongoose.model("cateogory");
const validateCategory = require("../validation/category");
exports.AddCategory = async (req, res) => {
  const { errors, isValid } = validateCategory(req.body);
  if (!isValid) return res.status(400).send(errors);
  let category = new Category(req.body);
  category = await category.save();
  res.send(category);
};

exports.getcategory = async (req, res) => {
  const category = await Category.find();
  res.send(category);
};

exports.getcategorybyId = async (req, res) => {
  const category = await Category.findById({ _id: req.params.id });
  if (!category)
    return res
      .status(400)
      .send("The category with the given ID was not found ");
  res.send(category);
};

exports.updatecategory = async (req, res) => {
  const { errors, isValid } = validatecategory(req.body);
  if (!isValid) return res.status(400).send(errors);

  const category = await category.findByIdAndUpdate(
    { _id: req.params.id },
    req.body,
    {
      new: true
    }
  );
  if (!publisher)
    return res
      .status(400)
      .send("The category with the given ID was not found ");
  res.send(category);
};

exports.deletecategory = async (req, res) => {
  const category = await Publisher.findByIdAndRemove({ _id: req.params.id });
  if (!category)
    return res
      .status(400)
      .send("The category with the given ID was not found.");
  res.send(category);
};
