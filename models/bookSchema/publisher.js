const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PublisherSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  }
});

const Publisher = mongoose.model("publisher", PublisherSchema);
module.exports = Publisher;
