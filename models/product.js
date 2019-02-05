const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const productSchema = new Schema({
  name: {
    type: String,
    maxlength: 100,
    unique: true,
    required: true
  },
  description: {
    type: String,
    trim: true,
    required: true
  },
  price: {
    type: Number,
    maxlength: 255
  },
  tags: {
    type: [Array]
  },
  brand: {
    type: Schema.Types.ObjectId,
    ref: "brand",
    required: true
  },
  shipping: {
    type: Boolean,
    required: true
  },
  available: {
    type: Boolean,
    required: true
  },
  wood: {
    type: Schema.Types.ObjectId,
    ref: "wood",
    required: true
  },
  frets: {
    type: Number
  },
  sold: {
    type: Number,
    default: 0
  },
  publish: {
    type: Boolean,
    required: true
  },
  images: {
    type: Array,
    default: []
  }
});
const Product = mongoose.model("product", productSchema);
module.exports = { Product };
