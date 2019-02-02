const mongoose = require("mongoose");
const Publisher = mongoose.model("publisher");
const validatepublisher = require("../validation/publisher");
exports.Addpublisher = async (req, res) => {
  const { errors, isValid } = validatepublisher(req.body);
  if (!isValid) return res.status(400).send(errors);
  let publisher = new Publisher(req.body);
  publisher = await publisher.save();
  res.send(publisher);
};

exports.getpublisher = async (req, res) => {
  const publisher = await Publisher.find();
  res.send(author);
};

exports.getpublisherbyId = async (req, res) => {
  const publisher = await Publisher.findById({ _id: req.params.id });
  if (!publisher)
    return res
      .status(400)
      .send("The publisher with the given ID was not found ");
  res.send(publisher);
};

exports.updatepublisher = async (req, res) => {
  const { errors, isValid } = validatepublisher(req.body);
  if (!isValid) return res.status(400).send(errors);

  const publisher = await Publisher.findByIdAndUpdate(
    { _id: req.params.id },
    req.body,
    {
      new: true
    }
  );
  if (!publisher)
    return res
      .status(400)
      .send("The publisher with the given ID was not found ");
  res.send(publisher);
};

exports.deletepublisher = async (req, res) => {
  const author = await Publisher.findByIdAndRemove({ _id: req.params.id });
  if (!publisher)
    return res
      .status(400)
      .send("The publisher with the given ID was not found.");
  res.send(publisher);
};
