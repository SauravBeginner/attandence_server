const express = require("express");
const router = express.Router();
const School = require("../models/School");
const verify = require("./verifyToken");

//ADD SCHOOL
router.post("/add", verify, async (req, res) => {
  if (req.user.role === "admin") {
    const newSchool = new School(req.body);
    try {
      const addedSchool = await newSchool.save();
      console.log(addedSchool);
      res.status(200).json(addedSchool);
    } catch (err) {
      res.status(500).json(err);
      console.log(err);
    }
  } else {
    console.log(`You are not authorizd!`);
    res.status(403).json({ err: `You are not authorizd!` });
  }
});

module.exports = router;
