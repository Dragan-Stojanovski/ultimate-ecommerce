const mongoose = require("mongoose");

const NavCategorySchema = new mongoose.Schema({
  label: {
    type: String,
    required: [true, "Label is required."],
  },
  path: {
    type: String,
    required: [true, "Path is required"],
    unique: true,
  },
});

module.exports = mongoose.model("CategorySchema", NavCategorySchema);
