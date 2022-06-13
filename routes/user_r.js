const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.post("/add", async (req, res) => {
  const newUser = new User(req.body);
  try {
    const addedUser = await newUser.save();
    console.log(addedUser);
    res.status(200).json(addedUser);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

module.exports = router;
