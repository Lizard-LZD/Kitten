const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const checkObjectId = require("../../middleware/checkObjectId");
const Adoption = require("../../models/Adoption");
const Profile = require("../../models/Profile");
const mongoose = require("mongoose");

// @route    GET api/adoptions
// @desc     Get all adoption
// @access   Private
router.get("/", auth, async (req, res) => {
  try {
    const adoptions = await Adoption.find().sort({ date: -1 });
    res.json(adoptions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    GET api/adoptions/:id
// @desc     Get adoption by ID
// @access   Private
router.get("/:id", auth, checkObjectId("id"), async (req, res) => {
  try {
    const adoption = await Adoption.findById(req.params.id);
    if (!adoption) {
      return res.status(404).json({ msg: "Adoption not found" });
    }
    res.json(adoption);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    POST api/adoptions
// @desc     Create an adoption
// @access   Private
router.post(
  "/",
  auth,
  check("kitten", "Kitten is required").notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const profile = await Profile.findOne({
        user: req.user.id,
        kittens: {
          $in: [new mongoose.Types.ObjectId(req.body.kitten)],
        },
      });

      if (!profile) {
        return res.status(400).json({ msg: "You do not own this kitten" });
      }

      const existingAdoption = await Adoption.findOne({
        kitten: req.body.kitten,
      });

      if (existingAdoption) {
        return res.status(400).json({ msg: "This kitten is already in adoption" });
      }

      const newAdoption = new Adoption({
        kitten: req.body.kitten,
        owner: req.user.id,
        adopter: []
      });

      const adoption = await newAdoption.save();

      res.json(adoption);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route    DELETE api/adoptions/:id
// @desc     Delete an adoption
// @access   Private
router.delete("/:id", [auth, checkObjectId("id")], async (req, res) => {
  try {
    const adoption = await Adoption.findById(req.params.id);

    if (!adoption) {
      return res.status(404).json({ msg: "Adoption not found" });
    }

    // Check owner
    if (adoption.owner.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    await adoption.deleteOne();

    res.json({ msg: "Adoption removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    PUT api/adoptions/apply/:id
// @desc     Apply for adoption
// @access   Private
router.put("/apply/:id", auth, checkObjectId("id"), async (req, res) => {
  try {
    const adoption = await Adoption.findById(req.params.id);

    if (!adoption) {
      return res.status(404).json({ msg: "Adoption not found" });
    }

    // Check if the user has already applied
    if (
      adoption.adopter.some(
        (applicant) => applicant.user.toString() === req.user.id
      )
    ) {
      return res
        .status(400)
        .json({ msg: "You have already applied for this adoption" });
    }

    adoption.adopter.push({ user: req.user.id });

    await adoption.save();

    return res.json(adoption.adopter);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    PUT api/adoptions/cancel/:id
// @desc     Cancel adoption application
// @access   Private
router.put("/cancel/:id", auth, checkObjectId("id"), async (req, res) => {
  try {
    const adoption = await Adoption.findById(req.params.id);

    if (!adoption) {
      return res.status(404).json({ msg: "Adoption not found" });
    }

    // Check if the user has applied before cancelling
    if (
      !adoption.adopter.some(
        (applicant) => applicant.user.toString() === req.user.id
      )
    ) {
      return res
        .status(400)
        .json({ msg: "You have not applied for this adoption" });
    }

    adoption.adopter = adoption.adopter.filter(
      ({ user }) => user.toString() !== req.user.id
    );

    await adoption.save();

    return res.json(adoption.adopter);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
