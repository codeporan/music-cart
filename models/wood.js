const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const woodSchema = new Schema({
  name: {
    required: true,
    type: String,
    maxlength: 100,
    unique: true
  }
});

const Wood = mongoose.model("wood", woodSchema);
module.exports = { Wood };
