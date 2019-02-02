const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const brandSchema = new Schema({
  name: {
    required: true,
    type: String,
    maxlength: 100,
    unique: true
  }
});

const Brand = mongoose.model("brand", brandSchema);
module.exports = { Brand };
