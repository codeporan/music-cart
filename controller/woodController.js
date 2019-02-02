const { Wood } = require("../models/wood");
const validateWood = require("../validation/wood");
exports.Addwood = async (req, res) => {
  const { errors, isValid } = validateWood(req.body);
  if (!isValid) return res.status(400).send(errors);
  let wood = new Wood(req.body);
  wood = await wood.save();
  res.send(wood);
};

exports.getWood = async (req, res) => {
  const wood = await Wood.find();
  res.send(wood);
};

exports.getWoodbyId = async (req, res) => {
  const wood = await Wood.findById({ _id: req.params.id });
  if (!wood)
    return res.status(400).send("The wood with the given ID was not found. ");
  res.send(wood);
};

exports.updateWood = async (req, res) => {
  const { errors, isValid } = validateWood(req.body);
  if (!isValid) return res.status(400).send(errors);
  const wood = await Wood.findByIdAndUpdate({ _id: req.params.id }, req.body, {
    new: true
  });
  if (!wood)
    return res.status(400).send("The wood with the given ID was not found. ");
  res.send(wood);
};
exports.deleteWood = async (req, res) => {
  const wood = await Wood.findByIdAndRemove({ _id: req.params.id });
  if (!wood)
    return res.status(400).send("The wood with the given ID was not found. ");
  res.send(wood);
};
