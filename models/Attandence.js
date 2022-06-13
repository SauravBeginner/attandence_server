const mongoose = require("mongoose");

const AttendanceSchema = mongoose.Schema({
  sName: {
    type: String,
    required: true,
  },
  sCode: {
    type: String,
    required: true,
    unique: true,
  },
  class: {
    type: String,
    required: true,
  },
  tName: {
    type: String,
    required: true,
  },
  tCode: {
    type: String,
    required: true,
    unique: true,
  },
  sub: {
    type: String,
    required: true,
  },
  schoolCode: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("Attandence", AttendanceSchema);
