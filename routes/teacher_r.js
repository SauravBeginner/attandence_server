const express = require("express");
const router = express.Router();
const Teacher = require("../models/Teacher");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const verify = require("./verifyToken");

//REGISGTER
router.post("/add", verify, async (req, res) => {
  //const newTeacher = new Teacher(req.body);
  if (req.user.role === "admin" || req.user.role === "schoolAdmin") {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.tpassword, salt);
      const obj = {
        tName: req.body.tName,
        tCode: req.body.tCode,
        tmail: req.body.tmail,
        tpassword: hashedPassword,
        tmobile: req.body.tmobile,
        sub: req.body.sub,
        schoolCode: req.body.schoolCode,
        role: req.body.role,
      };
      const addedTeacher = await Teacher.create(obj);
      const { tpassword, ...info } = addedTeacher._doc;
      console.log(addedTeacher);
      res.status(200).json({ ...info });
    } catch (err) {
      res.status(500).json(err);
      console.log(err);
    }
  } else {
    console.log(`You are not authorizd!`);
    res.status(403).json({ err: `You are not authorizd!` });
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    const teacher = await Teacher.findOne({ tmail: req.body.tmail });
    if (!teacher) {
      console.log(`Teacher not found!`);
      res.status(401).json({ err: `Teacher not found!` });
    } else {
      const validPassword = await bcrypt.compare(
        req.body.tpassword,
        teacher.tpassword
      );
      if (!validPassword) {
        console.log(`wrong password!`);
        res.status(401).json({ err: `Wrong Password!` });
      } else {
        const accessToken = jwt.sign(
          { id: teacher._id, role: teacher.role },
          process.env.SECRET_KEY,
          { expiresIn: "5d" }
        );
        const { tpassword, ...info } = teacher._doc;
        console.log(accessToken);
        res.status(200).json({ ...info, accessToken });
      }
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
