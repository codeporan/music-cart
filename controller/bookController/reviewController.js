const mongoose = require("mongoose");
const Review = mongoose.model("review");
const validateReview = require("../validation/review");
exports.addReview = async (req, res) => {
  const { errors, isValid } = validateReview(req.body);
  if (!isValid) return res.status(400).send(errors);
  req.body.author = req.user._id;
  req.body.store = req.params.id;
  const newReview = new Review(req.body);
  await newReview.save();
  res.json(newReview);
};

exports.getreview = async (req, res) => {
  const review = await Review.find();
  res.send(review);
};

exports.updatereview = async (req, res) => {
  const { errors, isValid } = validateReview(req.body);
  if (!isValid) return res.status(400).send(errors);

  const review = await Review.findByIdAndUpdate(
    { _id: req.params.id },
    req.body,
    {
      new: true
    }
  );
  if (!review)
    return res.status(400).send("The review with the given ID was not found ");
  res.send(review);
};

exports.deletereview = async (req, res) => {
  const review = await Review.findByIdAndRemove({ _id: req.params.id });
  if (!review)
    return res.status(400).send("The review with the given ID was not found.");
  res.send(review);
};
