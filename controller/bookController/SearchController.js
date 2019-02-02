const mongoose = require("mongoose");
const Book = mongoose.model("book");

exports.searchBooks = async (req, res) => {
  const books = await Book
    // first find stores that match
    .find(
      {
        $text: {
          $search: req.query.q
        }
      },
      {
        score: { $meta: "textScore" }
      }
    )
    // the sort them
    .sort({
      score: { $meta: "textScore" }
    })
    // limit to only 5 results
    .limit(5);
  res.json(books);
};
