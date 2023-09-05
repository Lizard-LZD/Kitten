const mongoose = require("mongoose");

const KittenSchema = new mongoose.Schema({
  breed: String,
  alt: String,
  pic: String,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
});

module.exports = mongoose.model("kitten", KittenSchema);
