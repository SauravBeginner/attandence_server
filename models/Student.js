const mongoose = require("mongoose");

const StudentSchema = mongoose.Schema({
  sName: {
    type: String,
    required: true,
  },
  sCode: {
    type: String,
    required: true,
    unique: true,
  },
  smail: {
    type: String,
    required: true,
  },
  spassword: {
    type: String,
    required: true,
  },
  smobile: {
    type: String,
  },
  sclass: {
    type: String,
    required: true,
  },
  schoolCode: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("Student", StudentSchema);
