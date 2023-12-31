const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  haveCats: {
    type: Boolean,
    required: true,
  },
  kittens: [
    {
      type: mongoose.Schema.Types.ObjectId, // Reference to Kitten model
      ref: "kitten",
    },
  ],
});

const Profile = mongoose.model("profile", ProfileSchema);
module.exports = Profile;
