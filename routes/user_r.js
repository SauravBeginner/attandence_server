const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//REGISGTER
router.post("/add", async (req, res) => {
  //const newUser = new User(req.body);
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const obj = {
      name: req.body.name,
      mail: req.body.mail,
      password: hashedPassword,
      mobile: req.body.mobile,
      role: req.body.role,
    };
    const addedUser = await User.create(obj);
    const { password, ...info } = addedUser._doc;
    console.log(addedUser);
    res.status(200).json({ ...info });
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ mail: req.body.mail });
    if (!user) {
      console.log(`User not found!`);
      res.status(401).json({ err: `User not found!` });
    } else {
      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!validPassword) {
        console.log(`wrong password!`);
        res.status(401).json({ err: `Wrong Password!` });
      } else {
        const accessToken = jwt.sign(
          { id: user._id, role: user.role },
          process.env.SECRET_KEY,
          { expiresIn: "5d" }
        );
        const { password, ...info } = user._doc;
        console.log(accessToken);
        res.status(200).json({ ...info, accessToken });
        //res.status(200).json(user);
      }
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
