const mongoose = require("mongoose");

const KittenSchema = new mongoose.Schema({
  breed: String,
  alt: String,
  pic: String
});

module.exports = mongoose.model("kitten", KittenSchema);
