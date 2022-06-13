const router = require("express").Router();
const Movie = require("../models/Movie");

//CREATE
router.post("/", async (req, res) => {
  const newMovie = new Movie(req.body);
  try {
    const savedMovie = await newMovie.save();

    res.status(200).json(savedMovie);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
