const mongoose = require("mongoose");

const KittenSchema = new mongoose.Schema({
  breed: String,
  alt: String,
  pic: Buffer,
});

module.exports = mongoose.model("kitten", KittenSchema);
