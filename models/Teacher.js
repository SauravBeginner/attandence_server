const mongoose = require("mongoose");

const TeacherSchema = mongoose.Schema({
  teacherName: {
    type: String,
    required: true,
  },
  teacherCode: {
    type: String,
    required: true,
    unique: true,
  },
  mail: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
  },
  sub: {
    type: String,
    required: true,
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
