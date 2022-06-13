const mongoose = require("mongoose");

const SchoolSchema = mongoose.Schema({
  schoolCode: {
    type: String,
    required: true,
    unique: true,
  },
  schoolName: {
    type: String,
    required: true,
    unique: true,
  },
  schoolMail: {
    type: String,
    required: true,
    //unique: true,
  },
});

module.exports = mongoose.model("School", SchoolSchema);
