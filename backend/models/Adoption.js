const mongoose = require("mongoose");

const AdoptionSchema = new mongoose.Schema({
  kitten: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "kitten",
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  adopter: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ]
});

module.exports = mongoose.model("Adoption", AdoptionSchema);
