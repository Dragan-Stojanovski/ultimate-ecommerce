const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    match: [
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      "Please fill a valid email address",
    ],
  },
  isAdmin: {
    type: Boolean,
    required: [true, "Role is required"],
    default: false,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("UserSchema", UserSchema);
