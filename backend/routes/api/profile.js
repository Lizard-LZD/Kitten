const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const checkObjectId = require("../../middleware/checkObjectId");
const { check, validationResult } = require("express-validator");
const Profile = require("../../models/Profile");
const User = require("../../models/User");
const Kitten = require("../../models/Kitten");

// @route    GET api/profile/me
// @desc     Get current users profile
// @access   Private
router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      "user",
      ["name", "avatar"]
    );
    if (!profile) {
      return res.status(400).json({ msg: "There is no profile for this user" });
    }
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    POST api/profile
// @desc     Create or update user profile
// @access   Private
router.post(
  "/",
  [auth, [check("haveCats", "HaveCats is required").exists()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, haveCats, kitten } = req.body;

    const profileFields = {};
    profileFields.user = req.user.id;

    if (name) profileFields.name = name;
    if (haveCats) profileFields.haveCats = haveCats;

    const kittenFields = {};
    if (kitten) {
      kittenFields.breed = kitten.breed;
      kittenFields.alt = kitten.alt;
      kittenFields.pic = kitten.pic;
    }

    try {
      const profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true, upsert: true }
      );

      if (kitten) {
        const newKitten = new Kitten(kittenFields);
        const savedKitten = await newKitten.save();
        profile.kittens.push(savedKitten._id);
        await profile.save();
      }

      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route    GET api/profile
// @desc     Get all profiles
// @access   Public
router.get("/", async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", ["name", "avatar"]).populate("kittens");;
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    GET api/profile/user/:user_id
// @desc     Get profile by user ID
// @access   Public
router.get("/user/:user_id", checkObjectId("user_id"), async (req, res) => {
  
  try {
    
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate("user", ["name", "avatar"]).populate("kittens");;
    if (!profile)
      return res.status(400).json({ msg: "There is no profile for this user" });
    res.json(profile);
  } catch (err) {
    console.log(req.params.user_id)
    console.error(err.message);
    if (err.kind == "ObjectId") {
      return res.status(400).json({ msg: "Profile not found" });
    }
    res.status(500).send("Server Error");
  }
});

// @route    DELETE api/profile
// @desc     Delete profile, user & posts
// @access   Private
router.delete("/", auth, async (req, res) => {
  try {
    //Remove posts
    //Remove profile
    await Profile.findOneAndRemove({ user: req.user.id });
    //Remove user
    await User.findOneAndRemove({ _id: req.user.id });

    res.json({ mag: "User deleted" });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    GET api/profile/kittens
// @desc     Get all kittens associated with the user
// @access   Private
router.get("/kittens", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      "kittens"
    );
    if (!profile) {
      return res.status(400).json({ msg: "Profile not found" });
    }
    res.json(profile.kittens);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    POST api/profile/kittens
// @desc     Add a new kitten to user's profile
// @access   Private
router.post(
  "/kittens",
  [auth, [check("breed", "Breed is required").notEmpty()]],
  async (req, res) => {
    // ... (validation and error handling)

    try {
      const { breed, alt, pic } = req.body;
      const newKitten = new Kitten({
        breed,
        alt,
        pic,
      });

      const kitten = await newKitten.save();
      const profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        {
          $set: { haveCats: true },
          $push: { kittens: kitten._id }
        },
        { new: true, upsert: true }
      );
      

      res.json(kitten);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route    DELETE api/profile/kittens/:kitten_id
// @desc     Delete a kitten from user's profile
// @access   Private
router.delete("/kittens/:kitten_id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    if (!profile) {
      return res.status(400).json({ msg: "Profile not found" });
    }

    profile.kittens = profile.kittens.filter(
      (kitten) => kitten.toString() !== req.params.kitten_id
    );
    await profile.save();

    await Kitten.findByIdAndRemove(req.params.kitten_id);

    res.json(profile.kittens);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    PUT api/profile/kittens/:kitten_id
// @desc     Update a kitten in user's profile
// @access   Private
router.put("/kittens/:kitten_id", auth, async (req, res) => {
  // ... (validation and error handling)

  try {
    const { breed, alt, pic } = req.body;
    const updatedKitten = {
      breed,
      alt,
      pic,
    };

    const kitten = await Kitten.findByIdAndUpdate(
      req.params.kitten_id,
      { $set: updatedKitten },
      { new: true }
    );

    res.json(kitten);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
