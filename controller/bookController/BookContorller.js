const mongoose = require("mongoose");
const aqp = require("api-query-params");
const Book = mongoose.model("book");
const Author = mongoose.model("author");
const Publisher = mongoose.model("publisher");
const Category = mongoose.model("category");

const validateBook = require("../validation/book");
const multer = require("multer");
const jimp = require("jimp");
const uuid = require("uuid");

const multerOptions = {
  storage: multer.memoryStorage(),
  fileFilter(req, file, next) {
    const isPhoto = file.mimetype.startsWith("image/");
    if (isPhoto) {
      next(null, true);
    } else {
      next({ message: "That filetype isn't allowed!" }, false);
    }
  }
};

exports.AddBooks = async (req, res) => {
  const { errors, isValid } = validateBook(req.body);
  if (!isValid) return res.status(400).send(errors);
  req.body.author = req.user._id;
  //   req.body.brand = req.brand._id;
  let book = new Book(req.body);
  book = await Book.save();
  res.send(book);
};

exports.upload = multer(multerOptions).single("photo");
exports.resize = async (req, res, next) => {
  //check if there is no new file to resize
  if (!req.file) {
    next(); // skip to the next middleware
    return;
  }

  const extension = req.file.mimetype.split("/")[1];
  req.body.photo = `${uuid.v4()}.${extension}`;
  // now we are resize
  const photo = await jimp.read(req.file.buffer);
  await photo.resize(800, jimp.AUTO);
  await photo.write(`./public/uploads/${req.body.photo}`);
  next();
};

exports.getbooksByquery = (req, res) => {
  const { filter, skip, limit, sort, projection } = aqp(req.query);
  //   limit = 100;
  Book.find(filter)
    .skip(skip)
    .limit(limit)
    .sort(sort)
    .populate("book")
    .populate("category")
    .populate("publisher")
    .select(projection)
    .exec((err, users) => {
      if (err) {
        res.json(err);
      }

      res.send(users);
    });
};
app.get("/api/product/articles_by_id", (req, res) => {
  const { filter, skip, limit, sort, projection } = aqp(req.query);

  // let type = req.query.type;
  // let items = req.query.id;
  let { type, id } = filter;
  if (type === "array") {
    let ids = id.split(",");
    items = [];
    items = ids.map(item => {
      return mongoose.Types.ObjectId(item);
    });
  }

  Book.find({ _id: { $in: items } })
    .populate("book")
    .populate("category")
    .populate("publisher")
    .exec((err, docs) => {
      return res.status(200).send(docs);
    });
});

exports.getBooks = async (req, res) => {
  const book = await Book.find();
  res.send(book);
};

exports.updateBooks = async (req, res) => {
  const { errors, isValid } = validatepublisher(req.body);
  if (!isValid) return res.status(400).send(errors);

  // find and update the store
  const book = await Book.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
    runValidators: true
  }).exec();
  if (!book)
    return res.status(400).send("The book with the given ID was not found ");
  res.json(book);
};

exports.BookBySlug = async (req, res, next) => {
  const book = await Book.findOne({ slug: req.params.slug }).populate(
    "author review category"
  );
  if (!book) return next();
  res.json(book);
};

exports.getpublisherbyId = async (req, res) => {
  const publisher = await Publisher.findById({ _id: req.params.id });
  if (!publisher)
    return res
      .status(400)
      .send("The publisher with the given ID was not found ");
  res.send(publisher);
};

exports.BookbyTagList = async (req, res) => {
  const tag = req.params.tag;
  const tagQuery = tag || { $exists: true, $ne: [] };
  const tagsPromise = Book.getTagList();
  const booksPromise = Book.find({ tags: tagQuery });
  const [tags, books] = await Promise.all([tagsPromise, booksPromise]);
  res.json({
    tag,
    tags,
    books
  });
};

exports.getTopBooklist = async (req, res) => {
  const books = await Book.storeGetToplist();
  res.json(books);
};

// exports.deletepublisher = async (req, res) => {
//   const author = await Publisher.findByIdAndRemove({ _id: req.params.id });
//   if (!publisher)
//     return res
//       .status(400)
//       .send("The publisher with the given ID was not found.");
//   res.send(publisher);
// };

exports.getBooksbyCategory = async (req, res) => {
  const category = req.params.id;
  const TagQuery = category || { $exists: true, $ne: [] };
  const BookCategory = Category.categorylist();
  const BookPromise = Category.find({ book: TagQuery });
  const [categories, Books] = await Promise.all([BookCategory, BookPromise]);
  res.json({
    category,
    categories,
    productsBooks
  });
};

exports.getBooksbyAuthor = async (req, res) => {
  const author = req.params.id;
  const TagQuery = author || { $exists: true, $ne: [] };
  const AuthorCategory = Author.categorylist();
  const AuthorPromise = Author.find({ author: TagQuery });
  const [authors, Books] = await Promise.all([AuthorCategory, AuthorPromise]);
  res.json({
    author,
    authors,
    Books
  });
};

exports.getBooksbyPublisher = async (req, res) => {
  const publisher = req.params.id;
  const TagQuery = publisher || { $exists: true, $ne: [] };
  const publisherCategory = Author.categorylist();
  const publisherPromise = Author.find({ publisher: TagQuery });
  const [publishers, Books] = await Promise.all([
    publisherCategory,
    publisherPromise
  ]);
  res.json({
    publisher,
    publishers,
    Books
  });
};
