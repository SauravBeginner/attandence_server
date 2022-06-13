const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
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
  role: {
    type: String,
    default: "user",
    enum: ["user", "admin"],
  },
});
module.exports = mongoose.model("User", UserSchema);
