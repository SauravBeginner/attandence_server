const mongoose = require("mongoose");

const TeacherSchema = mongoose.Schema({
  tName: {
    type: String,
    required: true,
  },
  tCode: {
    type: String,
    required: true,
    unique: true,
  },
  tmail: {
    type: String,
    required: true,
  },
  tpassword: {
    type: String,
    required: true,
  },
  tmobile: {
    type: String,
  },
  sub: {
    type: String,
  },
  schoolCode: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "teacher",
    enum: ["schoolAdmin", "teacher"],
  },
});
module.exports = mongoose.model("Teacher", TeacherSchema);
