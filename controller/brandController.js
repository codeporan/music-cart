const { Brand } = require("../models/brand");
const validatebrand = require("../validation/brand");
exports.Addbrand = async (req, res) => {
  const { errors, isValid } = validatebrand(req.body);
  if (!isValid) return res.status(400).send(errors);
  let brand = new Brand(req.body);
  brand = await brand.save();
  res.send(brand);
};
exports.getBrand = async (req, res) => {
  const brand = await Brand.find();
  res.send(brand);
};
exports.getBrandbyId = async (req, res) => {
  const brand = await Brand.findById({ _id: req.params.id });
  if (!brand)
    return res.status(400).send("The Brand with the given ID was not found ");
  res.send(brand);
};

exports.updateBrand = async (req, res) => {
  const { errors, isValid } = validatebrand(req.body);
  if (!isValid) return res.status(400).send(errors);

  const brand = await Brand.findByIdAndUpdate(
    { _id: req.params.id },
    req.body,
    {
      new: true
    }
  );
  if (!brand)
    return res.status(400).send("The Brand with the given ID was not found ");
  res.send(brand);
};

exports.deleteBrand = async (req, res) => {
  const brand = await Brand.findByIdAndRemove({ _id: req.params.id });
  if (!brand)
    return res.status(400).send("The Brand with the given ID was not found.");
  res.send(brand);
};
