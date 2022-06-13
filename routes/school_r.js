const express = require("express");
const router = express.Router();
const School = require("../models/School");

router.post("/add", async (req, res) => {
  const newSchool = new School(req.body);
  try {
    const addedSchool = await newSchool.save();
    console.log(addedSchool);
    res.status(200).json(addedSchool);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

module.exports = router;
