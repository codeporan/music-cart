const mongoose = require("mongoose");
const User = mongoose.model("user");
const Book = mongoose.model("book");

exports.AddCart = async (req, res) => {
  let user = await User.findOne({ _id: req.user._id });
  if (!user) return res.status(400).send("User id not found");
  let duplicate = false;
  user.cart.forEach(item => {
    if (item.id == req.query.productId) {
      duplicate = true;
    }
  });
  if (duplicate) {
    User.findOneAndUpdate(
      {
        _id: req.user._id,
        "cart.id": mongoose.Types.ObjectId(req.query.productId)
      },
      { $inc: { "cart.$.quantity": 1 } },
      { new: true },
      () => {
        if (err) return res.json({ success: false, err });
        res.status(200).json(doc.cart);
      }
    );
  } else {
    User.findOneAndUpdate(
      { _id: req.user._id },
      {
        $push: {
          cart: {
            id: mongoose.Types.ObjectId(req.query.productId),
            quantity: 1,
            date: Date.now()
          }
        }
      },
      {
        new: true
      },
      (err, doc) => {
        if (err) return res.json({ success: false, err });
        res.status(200).json(doc.cart);
      }
    );
  }
};

exports.removeCart = async (req, res) => {
  let user = await User.findOne({ _id: req.user._id });
  if (!user) return res.status(400).send("User id not found");
  let duplicate = false;
  user.cart.forEach(item => {
    if (item.id == req.query.bookId) {
      duplicate = true;
    }
  });
  if (duplicate) {
    User.findOneAndUpdate(
      {
        _id: req.user._id,
        "cart.id": mongoose.Types.ObjectId(req.query.bookId)
      },
      { $inc: { "cart.$.quantity": 1 } },
      { new: true },
      () => {
        if (err) return res.json({ success: false, err });
        res.status(200).json(doc.cart);
      }
    );
  } else {
    User.findOneAndUpdate(
      { _id: req.user._id },
      {
        $pull: {
          cart: {
            id: mongoose.Types.ObjectId(req.query.bookId),
            quantity: 1,
            date: Date.now()
          }
        }
      },
      {
        new: true
      },
      (err, doc) => {
        if (err) return res.json({ success: false, err });
        res.status(200).json(doc.cart);
      }
    );
  }
};

exports.removeProductCart = async (req, res) => {
  const user = await User.findOneAndUpdate(
    {
      _id: req.user._id
    },
    {
      $pull: { cart: { id: mongoose.Types.ObjectId(req.query._id) } }
    },
    {
      new: true
    }
  );
  let cart = user.cart;
  let array = cart.map(item => mongoose.Types.ObjectId(item.id));

  const book = await Book.find({ _id: { $inc: array } })
    .populate("brand")
    .populate("wood")
    .exec();
  res.send(cart, book);
};
