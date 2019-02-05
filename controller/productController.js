const mongoose = require("mongoose");
const { Product } = require("../models/product");
const validateProduct = require("../validation/product");

exports.AddProduct = async (req, res) => {
  const { errors, isValid } = validateProduct(req.body);
  if (!isValid) return res.status(400).send(errors);
  let product = new Product(req.body);
  product = await product.save();
  res.send(product);
};

exports.getProductbySortbyarticle = async (req, res) => {
  let order = req.query.order ? req.query.order : "asc";
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
  let limit = req.query.limit ? parseInt(req.query.limit) : 100;

  const product = await Product.find()
    .populate("brand")
    .populate("wood")
    .sort([[sortBy, order]])
    .limit(limit)
    .exec();
  if (!product)
    return res.status(404).send("The Product with the given ID was not found");
  res.send(product);
};

/// /api/product/article?id=HSHSHSKSK,JSJSJSJS,SDSDHHSHDS,JSJJSDJ&type=single
exports.getProductArticleByid = async (req, res) => {
  let type = req.query.type;
  let items = req.query.id;
  if (type === "array") {
    let ids = items.split(",");
    items = [];
    items = ids.map(item => mongoose.Types.ObjectId(item));
  }
  let product = await Product.find({ _id: { $in: items } })
    .populate("brand")
    .populate("wood")
    .exec();
  res.send(product);
};

exports.ProducToShop = (req, res) => {
  let order = req.body.order ? req.body.order : "desc";
  let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
  let limit = req.body.limit ? parseInt(req.body.limit) : 100;
  let skip = parseInt(req.body.skip);
  let findArgs = {};

  for (let key in req.body.filters) {
    if (req.body.filters[key].length > 0) {
      if (key === "price") {
        findArgs[key] = {
          $gte: req.body.filters[key][0],
          $lte: req.body.filters[key][1]
        };
      } else {
        findArgs[key] = req.body.filters[key];
      }
    }
  }

  findArgs["publish"] = true;

  Product.find(findArgs)
    .populate("brand")
    .populate("wood")
    .sort([[sortBy, order]])
    .skip(skip)
    .limit(limit)
    .exec((err, articles) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({
        size: articles.length,
        articles
      });
    });
};
