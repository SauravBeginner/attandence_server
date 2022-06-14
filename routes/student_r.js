const express = require("express");
const router = express.Router();
const Student = require("../models/Student");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const verify = require("./verifyToken");

//REGISGTER
router.post("/add", verify, async (req, res) => {
  //const newStudent = new Student(req.body);
  if (req.user.role === "admin" || req.user.role === "schoolAdmin") {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.spassword, salt);
      const obj = {
        sCode: req.body.sCode,
        sName: req.body.sName,
        smail: req.body.smail,
        spassword: hashedPassword,
        smobile: req.body.smobile,
        sclass: req.body.sclass,
        schoolCode: req.body.schoolCode,
      };
      const addedStudent = await Student.create(obj);
      const { spassword, ...info } = addedStudent._doc;
      console.log(addedStudent);
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
    const student = await Student.findOne({ smail: req.body.smail });
    if (!student) {
      console.log(`Student not found!`);
      res.status(401).json({ err: `Student not found!` });
    } else {
      const validPassword = await bcrypt.compare(
        req.body.spassword,
        student.spassword
      );
      if (!validPassword) {
        console.log(`wrong password!`);
        res.status(401).json({ err: `Wrong Password!` });
      } else {
        const accessToken = jwt.sign(
          { id: student._id },
          process.env.SECRET_KEY,
          { expiresIn: "5d" }
        );
        const { spassword, ...info } = student._doc;
        console.log(accessToken);
        res.status(200).json({ ...info, accessToken });
      }
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
