const mongoose = require("mongoose");
const { User } = require("../models/user");
const { Product } = require("../models/product");
const { Payment } = require("../models/payment");
const async = require("async");
exports.AddCart = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.query.productId)) {
    return res.status(400).send({ message: "query Product Id is incorrect" });
  }
  let user;
  // find user
  user = await User.findOne({ _id: req.user._id });
  let duplicate = false;
  // find cart item id inside user documents
  user.cart.forEach(item => {
    // cart item  id === query id is true
    // duplicate will be true becasue we need to increment quantity
    if (item.id == req.query.productId) {
      duplicate = true;
    }
  });
  if (duplicate) {
    // add cart item and if item is same so, quantity will be increase
    user = await User.findOneAndUpdate(
      {
        _id: req.user._id,
        "cart.id": mongoose.Types.ObjectId(req.query.productId)
      },
      { $inc: { "cart.$.quantity": 1 } },
      { new: true }
    );
    if (!user) return res.status(400).send("User is not found");
    res.send(user.cart);
  } else {
    // add cart item inside user documents
    user = await User.findOneAndUpdate(
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
      { new: true }
    );
    if (!user) return res.status(400).send("User is not found");
    res.status(200).send(user.cart);
  }
};

exports.removeProductCart = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.query.productId)) {
    return res.status(400).send({ message: "query Id is incorrect" });
  }
  let user;
  user = await User.findOneAndUpdate(
    {
      _id: req.user._id
    },
    { $pull: { cart: { id: mongoose.Types.ObjectId(req.query.productId) } } },
    { new: true }
  );
  let cart = user.cart;
  let array = cart.map(item => mongoose.Types.ObjectId(item.id));
  user = await Product.find({ _id: { $in: array } })
    .populate("brand")
    .populate("wood")
    .exec();

  res.status(200).json({ user, cart });
};

exports.onSuccessBuy = (req, res) => {
  let history = [];
  let transactionData = {};
  //user history
  req.body.cartDetail.forEach(item => {
    history.push({
      dateOfPurchase: Date.now(),
      name: item.name,
      brand: item.brand.name,
      id: item._id,
      price: item.price,
      quantity: item.quantity,
      paymentId: req.body.paymentData.paymentID
    });
  });

  // payment Dash
  transactionData.user = {
    id: req.user._id,
    name: req.user.name,
    lastname: req.user.lastname,
    email: req.user.email
  };
  transactionData.data = req.body.paymentData;
  transactionData.product = history;

  User.findOneAndUpdate(
    { _id: req.user._id },
    { $push: { history: history }, $set: { cart: [] } },
    { new: true },
    (err, user) => {
      if (err) return res.json({ success: false, err });

      const payment = new Payment(transactionData);
      payment.save((err, doc) => {
        if (err) return res.json({ success: false, err });
        let products = [];
        doc.product.forEach(item => {
          products.push({ id: item.id, quantity: item.quantity });
        });

        async.eachSeries(
          products,
          (item, callback) => {
            Product.update(
              { _id: item.id },
              {
                $inc: {
                  sold: item.quantity
                }
              },
              { new: false },
              callback
            );
          },
          err => {
            if (err) return res.json({ success: false, err });
            res.status(200).json({
              success: true,
              cart: user.cart,
              cartDetail: []
            });
          }
        );
      });
    }
  );
};
