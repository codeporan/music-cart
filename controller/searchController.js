const { Product } = require("../models/product");
exports.Search = async (req, res) => {
  const product = await Product.find(
    {
      $text: {
        $search: req.query.q
      }
    },
    { score: { $meta: "textScore" } }
  )
    .populate("brand")
    .populate("wood")
    .sort({ score: { $meta: "textScore" } })
    .limit(10)
    .exec();
  res.send(product);
};
