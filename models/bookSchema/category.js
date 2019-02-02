const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  }
});

const Category = mongoose.model("author", CategorySchema);
module.exports = Category;
