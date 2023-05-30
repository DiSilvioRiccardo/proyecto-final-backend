const mongoose = require("mongoose");
import { areValidCategories, categories } from "../constants";

const userSchema = new mongoose.Schema({
  name: { type: String, default: null },
  email: { type: String, unique: true },
  password: { type: String },
  token: { type: String, default: null },
  categories: {type: [String], default: [], 
    validate: areValidCategories,
      message: userCategories => `${userCategories} includes invalid categories! Valid categories are ${categories.toString()}`
  }}
);

module.exports = mongoose.model("user", userSchema);