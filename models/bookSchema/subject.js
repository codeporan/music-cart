const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SubjectSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  }
});

const Subject = mongoose.model("subject", SubjectSchema);
module.exports = Subject;
