const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`Database connected!`);
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
