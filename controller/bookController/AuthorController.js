const mongoose = require("mongoose");
const Author = mongoose.model("author");
const validateAuthor = require("../validation/author");
exports.Addauthor = async (req, res) => {
  const { errors, isValid } = validateAuthor(req.body);
  if (!isValid) return res.status(400).send(errors);
  let author = new Author(req.body);
  author = await author.save();
  res.send(author);
};

exports.getAuthor = async (req, res) => {
  const author = await Author.find();
  res.send(author);
};

exports.getAuthorbyId = async (req, res) => {
  const author = await Author.findById({ _id: req.params.id });
  if (!author)
    return res.status(400).send("The author with the given ID was not found ");
  res.send(author);
};

exports.updateAuthor = async (req, res) => {
  const { errors, isValid } = validateauthor(req.body);
  if (!isValid) return res.status(400).send(errors);

  const author = await Author.findByIdAndUpdate(
    { _id: req.params.id },
    req.body,
    {
      new: true
    }
  );
  if (!author)
    return res.status(400).send("The author with the given ID was not found ");
  res.send(author);
};

exports.deleteAuthor = async (req, res) => {
  const author = await Author.findByIdAndRemove({ _id: req.params.id });
  if (!author)
    return res.status(400).send("The author with the given ID was not found.");
  res.send(author);
};
